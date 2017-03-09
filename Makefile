.DEFAULT_GOAL := build

# Pull in dependencies
#
# Examples:
#   make install
install:
	hack/install-deps.sh
.PHONY: install

# Clean up all dependencies
#
#
# Example:
#   make clean
#   make test
clean:
	hack/clean-deps.sh
.PHONY: clean

# Run `npm run build`
#
# Examples:
#   make build
build: install
	npm run build
.PHONY: build

# Run all tests
#
# Examples:
#   make test
test: build
	hack/verify-dist.sh
	hack/test-headless.sh test
.PHONY: test
