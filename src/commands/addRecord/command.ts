/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

export class AddRecordsCommand {
  async handle(request: Request, response: Response): Promise<Response> {
    const { weight, date } = request.body;

    try {
      // TODO
      console.log(weight, date);
    } catch (e) {
      response.status(400).json({
        message: e.message || 'Unexpected error.'
      });
    }

    return response.status(201).send();
  }
}
