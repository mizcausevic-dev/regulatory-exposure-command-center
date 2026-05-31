import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "./app.js";

describe("regulatory-exposure-command-center app", () => {
  it("serves each html route", async () => {
    const htmlRoutes = ["/", "/regulatory-lane", "/exposure-findings", "/board-brief", "/verification", "/docs"];
    const app = createApp();

    for (const route of htmlRoutes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/html/);
    }
  });

  it("serves each json route", async () => {
    const apiRoutes = [
      "/api/dashboard/summary",
      "/api/regulatory-lane",
      "/api/exposure-findings",
      "/api/board-brief",
      "/api/verification",
      "/api/sample"
    ];
    const app = createApp();

    for (const route of apiRoutes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/json/);
    }
  });
});
