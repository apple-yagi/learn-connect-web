
.PHONY: generate
generate:
	buf generate

.PHONY: run
run:
	go run cmd/learn-connect-web/main.go
