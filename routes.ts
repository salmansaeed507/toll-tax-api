import express, { Request, Response, Router } from "express"
import entryHandler from "./entry"
import exitHandler from "./exit"

const router: Router = express.Router()

router.post("/entry", entryHandler)
router.post("/exit", exitHandler)

export default router