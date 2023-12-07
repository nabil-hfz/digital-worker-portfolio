import request from 'supertest';
import express from 'express';
import { HttpResponseError } from '../utils/http-response-error';
import { HttpServer } from '.';

describe('HttpServer', () => {
    let app: express.Express;
    let httpServer: HttpServer;

    beforeEach(() => {
        app = express();
        httpServer = new HttpServer(app);
    });

    it('should handle GET requests', async () => {
        const mockHandler = jest.fn((req, res) => res.status(200).send('OK'));
        httpServer.get({ path: '/test', requestHandler: mockHandler });

        await request(app).get('/test').expect(200, 'OK');
        expect(mockHandler).toHaveBeenCalled();
    });

    it('should handle errors with HttpResponseError', async () => {
        const mockHandler = jest.fn((req, res) => {
            throw new HttpResponseError(400, 'BAD_REQUEST', 'Error message');
        });
        httpServer.get({ path: '/error', requestHandler: mockHandler });

        const response = await request(app).get('/error');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: {
                status: 400,
                code: 'BAD_REQUEST',
                description: 'Error message',
            },
        });
    });


    it('should handle unexpected errors', async () => {
        const mockHandler = jest.fn((req, res) => {
            throw new Error('Unexpected error');
        });
        httpServer.get({ path: '/unexpected-error', requestHandler: mockHandler });

        const response = await request(app).get('/unexpected-error');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: {
                status: 500,
                code: 'INTERNAL_ERROR',
                description: expect.stringContaining('Unexpected error'),
            },
        });
    });

});
