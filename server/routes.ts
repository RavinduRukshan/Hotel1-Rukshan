import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import morgan from "morgan";
import { connectDatabase } from "./config/database";
import { authenticateAdmin } from "./middleware/auth";
import * as roomController from "./controllers/roomController";
import * as reservationController from "./controllers/reservationController";
import * as adminController from "./controllers/adminController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB
  await connectDatabase();

  // Logging middleware
  app.use(morgan("dev"));

  // Stripe webhook needs raw body
  app.post(
    "/api/webhooks/stripe",
    express.raw({ type: "application/json" }),
    reservationController.handleStripeWebhook
  );

  // JSON body parser for all other routes
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Public room endpoints
  app.get("/api/rooms", roomController.getAllRooms);
  app.get("/api/rooms/:slug", roomController.getRoomBySlug);

  // Availability check
  app.post("/api/availability/check", roomController.checkAvailability);

  // Reservation endpoints
  app.post("/api/reservations/create-intent", reservationController.createCheckoutSession);
  app.get("/api/reservations/session/:sessionId", reservationController.getReservationBySessionId);

  // Admin authentication
  app.post("/api/admin/login", adminController.login);

  // Protected admin endpoints
  app.get("/api/admin/reservations", authenticateAdmin, adminController.getAllReservations);
  app.get("/api/admin/reservations/:id", authenticateAdmin, adminController.getReservationById);
  app.patch("/api/admin/reservations/:id", authenticateAdmin, adminController.updateReservationStatus);
  app.get("/api/admin/reports", authenticateAdmin, adminController.exportReservationsCSV);

  // Admin room management
  app.post("/api/admin/rooms", authenticateAdmin, adminController.createRoom);
  app.patch("/api/admin/rooms/:id", authenticateAdmin, adminController.updateRoom);
  app.delete("/api/admin/rooms/:id", authenticateAdmin, adminController.deleteRoom);

  const httpServer = createServer(app);

  return httpServer;
}
