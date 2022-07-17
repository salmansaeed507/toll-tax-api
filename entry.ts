import { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import calculator from "./calculator";

export default async function(req: Request, res: Response, next: Function) {

    try {
        const date: string = req.body.date as string
        const number: string = req.body.number as string
        const interchange: string = req.body.interchange as string

        const collection = mongoose.connection.collection("app_toll")

        const vehicle = await collection.findOne({number: number, isComplete: false})
        if (vehicle) {
            res.json({
                success: false,
                error: "Vehicle already on the route"
            })
            return false
        }

        collection.insertOne({
            date: date,
            number: number,
            entryInterchange: interchange,
            isComplete: false
        })

        res.json({
            success: true,
            message: "Vehicle marked as entered successfully"
        })
    } catch (err) {
        next(err)
    }
}