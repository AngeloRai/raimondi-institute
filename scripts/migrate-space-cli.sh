#!/bin/bash

# Contentful Space Migration Script using Official CLI
# This script uses Contentful's official CLI tools for reliable space copying
# It handles authentication, export, and import automatically

set -e  # Exit on any error

# Configuration
SOURCE_SPACE_ID="${SOURCE_CONTENTFUL_SPACE_ID}"
SOURCE_TOKEN="${SOURCE_CONTENTFUL_MANAGEMENT_TOKEN}"
SOURCE_ENV="${SOURCE_CONTENTFUL_ENVIRONMENT:-master}"

DEST_SPACE_ID="${DEST_CONTENTFUL_SPACE_ID}"
DEST_TOKEN="${DEST_CONTENTFUL_MANAGEMENT_TOKEN}"
DEST_ENV="${DEST_CONTENTFUL_ENVIRONMENT}"
DEST_ENV="${DEST_ENV:-master}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Validation
validate_config() {
    log_info "Validating configuration..."
    
    if [[ -z "$SOURCE_SPACE_ID" || -z "$SOURCE_TOKEN" ]]; then
        log_error "Missing source space configuration:"
        log_error "  SOURCE_CONTENTFUL_SPACE_ID and SOURCE_CONTENTFUL_MANAGEMENT_TOKEN are required"
        exit 1
    fi
    
    if [[ -z "$DEST_SPACE_ID" || -z "$DEST_TOKEN" ]]; then
        log_error "Missing destination space configuration:"
        log_error "  DEST_CONTENTFUL_SPACE_ID and DEST_CONTENTFUL_MANAGEMENT_TOKEN are required"
        log_error "  (or use current project's space env vars as fallback)"
        exit 1
    fi
    
    log_info "Configuration:"
    log_info "  Source: $SOURCE_SPACE_ID ($SOURCE_ENV)"
    log_info "  Destination: $DEST_SPACE_ID ($DEST_ENV)"
}

# Check if Contentful CLI is installed
check_cli() {
    log_info "Checking Contentful CLI installation..."
    
    if ! command -v contentful &> /dev/null; then
        log_error "Contentful CLI is not installed"
        log_info "Install it with: npm install -g contentful-cli"
        exit 1
    fi
    
    local version=$(contentful --version)
    log_success "Contentful CLI found: $version"
}

# Authenticate with both accounts
authenticate() {
    log_info "Setting up authentication..."
    
    # Authenticate source account
    log_info "Authenticating source account..."
    contentful login --management-token "$SOURCE_TOKEN"
    log_success "Source account authenticated"
    
    # Note: CLI can only handle one token at a time, we'll switch tokens per operation
}

# Export source space
export_space() {
    log_info "Exporting source space..." >&2
    
    local timestamp=$(date +"%Y-%m-%dT%H-%M-%S")
    local export_file="contentful-export-${SOURCE_SPACE_ID}-${SOURCE_ENV}-${timestamp}.json"
    
    log_info "Starting export (this may take several minutes)..." >&2
    
    # Run export and redirect all output to stderr to avoid contaminating the return value
    if ! contentful space export \
        --management-token "$SOURCE_TOKEN" \
        --space-id "$SOURCE_SPACE_ID" \
        --environment-id "$SOURCE_ENV" \
        --download-assets \
        --export-file "$export_file" >&2; then
        log_error "Export command failed" >&2
        exit 1
    fi
    
    # Check if export file was created with exact name
    if [[ -f "$export_file" ]]; then
        log_success "Export completed: $export_file" >&2
        echo "$export_file"
    else
        # Look for any contentful export file with similar pattern
        local found_file=$(ls contentful-export-${SOURCE_SPACE_ID}-${SOURCE_ENV}-*.json 2>/dev/null | head -1)
        if [[ -n "$found_file" ]]; then
            log_success "Export completed with different timestamp: $found_file" >&2
            echo "$found_file"
        else
            log_error "Export failed - no export file found" >&2
            log_info "Checking current directory contents:" >&2
            ls -la contentful-export-*.json 2>/dev/null || log_info "No contentful export files found" >&2
            exit 1
        fi
    fi
}

# Import to destination space
import_space() {
    local export_file="$1"
    
    log_info "Importing to destination space..."
    log_warning "This will overwrite content in the destination space!"
    
    # Ask for confirmation
    read -p "Continue with import? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Import cancelled by user"
        exit 0
    fi
    
    log_info "Starting import (this may take several minutes)..."
    
    # Switch to destination account authentication
    log_info "Authenticating with destination account for import..."
    contentful login --management-token "$DEST_TOKEN"
    
    # Run import and capture output
    log_info "Running import command:"
    log_info "contentful space import --space-id $DEST_SPACE_ID --environment-id $DEST_ENV --content-file $export_file"
    
    if ! contentful space import \
        --space-id "$DEST_SPACE_ID" \
        --environment-id "$DEST_ENV" \
        --content-file "$export_file" 2>&1; then
        log_error "Import command failed"
        log_info "Checking if export file exists: $export_file"
        if [[ -f "$export_file" ]]; then
            log_info "Export file exists and is readable"
            ls -la "$export_file"
        else
            log_error "Export file not found: $export_file"
        fi
        exit 1
    fi
    
    log_success "Import completed successfully!"
}

# Cleanup
cleanup() {
    local export_file="$1"
    
    if [[ -f "$export_file" ]]; then
        read -p "Delete export file $export_file? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm "$export_file"
            log_success "Export file deleted"
        else
            log_info "Export file kept: $export_file"
        fi
    fi
}

# Main migration function
migrate() {
    log_info "🚀 Starting Contentful space migration using CLI..."
    echo
    
    validate_config
    check_cli
    authenticate
    
    local export_file=$(export_space)
    import_space "$export_file"
    
    echo
    log_success "✅ Migration completed successfully!"
    log_info "📋 Next steps:"
    log_info "  • Verify content in destination space"
    log_info "  • Set up webhooks and UI extensions if needed"
    log_info "  • Configure user permissions"
    
    cleanup "$export_file"
}

# Help function
show_help() {
    cat << EOF
Contentful Space Migration Script (CLI-based)

This script uses the official Contentful CLI to export and import spaces
between different Contentful accounts.

USAGE:
    $0 [OPTIONS]

OPTIONS:
    -h, --help          Show this help message
    --dry-run          Show configuration without running migration
    --keep-export      Keep export file after migration

ENVIRONMENT VARIABLES:
    Required for source space:
        SOURCE_CONTENTFUL_SPACE_ID
        SOURCE_CONTENTFUL_MANAGEMENT_TOKEN
        SOURCE_CONTENTFUL_ENVIRONMENT (optional, defaults to 'master')
    
    Required for destination space:
        DEST_CONTENTFUL_SPACE_ID
        DEST_CONTENTFUL_MANAGEMENT_TOKEN
        DEST_CONTENTFUL_ENVIRONMENT (defaults to 'master')

EXAMPLES:
    # Basic migration using environment variables
    $0
    
    # Show configuration without running
    $0 --dry-run
    
    # Keep export file after migration
    $0 --keep-export

PREREQUISITES:
    • Contentful CLI must be installed: npm install -g contentful-cli
    • Management tokens for both source and destination accounts
    • Destination space should be empty to avoid conflicts

EOF
}

# Parse command line arguments
DRY_RUN=false
KEEP_EXPORT=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --keep-export)
            KEEP_EXPORT=true
            shift
            ;;
        *)
            log_error "Unknown option: $1"
            log_info "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Run migration or dry run
if [[ "$DRY_RUN" == "true" ]]; then
    log_info "🔍 Dry run - showing configuration only"
    validate_config
    check_cli
    log_info "Configuration is valid. Run without --dry-run to execute migration."
else
    migrate
fi