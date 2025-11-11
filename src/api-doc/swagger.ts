import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-COMMERCE APP API',
      version: '1.0.0',
      description:
        'REST API For E-commerce App. This API Will Manage CRUD Operations',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    paths: {},
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'bearerAuth',
          in: 'header',
        },
      },
    },
  },
  apis: ['./**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
