## Learning connect-web
ref https://future-architect.github.io/articles/20220819a/

## Require

[buf](https://github.com/bufbuild/buf)

You can install buf using Homebrew (macOS or Linux):

```
brew install bufbuild/buf/buf
```


You'll use the protoc-gen-go and protoc-gen-go-grpc plugins to generate code with buf generate, so you'll need to install them:

```
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

You also need to update your PATH so that buf can find the plugins:
```
export PATH="$PATH:$(go env GOPATH)/bin"
```
