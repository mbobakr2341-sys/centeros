package main

import (
	"fmt"
	"log"
	"net/http"

	"centeros/backend/internal/config"
)

func main() {
	cfg := config.Load()

	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, `{"status":"ok","service":"centeros-api"}`)
	})

	addr := ":" + cfg.Port

	log.Printf(
		"CenterOS API running on http://localhost%s [%s]",
		addr,
		cfg.AppEnv,
	)

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal(err)
	}
}
