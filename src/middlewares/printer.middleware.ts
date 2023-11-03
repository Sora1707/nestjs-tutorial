import { Request, Response, NextFunction } from 'express';

export function printer(req: Request, res: Response, next: NextFunction) {
    console.log('Printer...');
    next();
}
