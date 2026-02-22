.PHONY: help maintenance-on maintenance-off restart-all logs db-push db-studio

help:
	@echo "Server:"
	@echo "  make maintenance-on    - Enable maintenance mode"
	@echo "  make maintenance-off   - Disable maintenance mode"
	@echo "  make restart-all       - Restart all Docker services"
	@echo "  make logs              - Tail app logs"
	@echo ""
	@echo "Database:"
	@echo "  make db-push           - Push schema to database"
	@echo "  make db-studio         - Open Drizzle Studio"

maintenance-on:
	@echo "=== Enabling Maintenance Mode ==="
	@docker compose stop app
	@echo "Maintenance mode enabled. Run 'make maintenance-off' to restore."

maintenance-off:
	@echo "=== Disabling Maintenance Mode ==="
	@docker compose start app
	@sleep 5
	@echo "Service restored."

restart-all:
	@echo "=== Restarting All Services ==="
	@docker compose restart
	@echo "All services restarted."

logs:
	@docker compose logs -f app

db-push:
	docker compose exec app npx drizzle-kit push

db-studio:
	docker compose exec app npx drizzle-kit studio
