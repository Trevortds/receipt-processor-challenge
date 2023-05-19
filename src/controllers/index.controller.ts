import { Request, Response } from "express";

/**
 * GET /
 *
 * Assuming this is behind some kind of gateway, you might remove this entirely,
 * or put some kind of health check info here for your ALBs.
 */
export const indexController = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send({ message: "Express Root" });
};