import { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import calculator from "./calculator";
import { INTERCHANGES_KEYS } from "./interchanges";

export default async function(req: Request, res: Response) {
    const number: string = req.body.number as string
    const interchange: INTERCHANGES_KEYS = req.body.interchange as INTERCHANGES_KEYS

    const collection = mongoose.connection.collection("app_toll")

    const vehicle = await collection.findOne({number: number, isComplete: false})
    if (!vehicle) {
        res.json({
            success: false,
            error: "Vehicle is not on the route"
        })
        return false
    }

    collection.findOneAndUpdate({_id: vehicle._id}, {
        $set: {
            tax: calculator(vehicle.number, vehicle.entryInterchange, interchange, vehicle.date),
            exitInterchange: interchange,
            isComplete: true
        }
    })

    res.json({
        success: true,
        message: "Vehicle marked as exit successfully",
        data: await collection.findOne({_id: vehicle._id})
    })
    return true
}