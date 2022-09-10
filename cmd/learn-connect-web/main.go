package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	learnconnectweb "github.com/apple-yagi/learn-connect-web"
	"github.com/apple-yagi/learn-connect-web/gen/greet/v1/greetv1connect"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

const addr = ":8888"

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	greeter := &learnconnectweb.GreetServer{}
	mux := http.NewServeMux()
	path, handler := greetv1connect.NewGreetServiceHandler(greeter)
	mux.Handle(path, handler)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowCredentials: true,
		Debug:            true,
	})

	h := c.Handler(mux)

	server := &http.Server{
		Addr:    addr,
		Handler: h2c.NewHandler(h, &http2.Server{}),
	}

	go func() {
		<-ctx.Done()
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		server.Shutdown(ctx)
	}()
	log.Println("start receiving at " + addr)
	log.Fatal(server.ListenAndServe())
}
