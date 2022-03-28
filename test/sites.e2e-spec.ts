import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { CreateSiteDto } from '../src/modules/sites/dto/create-site.dto';
import { UpdateSiteDto } from '../src/modules/sites/dto/update-site.dto';
import { AppModule } from '../src/app.module';

const createSiteDto: CreateSiteDto = { name: 'Name', address: 'Address', description: 'Description' };
const updatedSiteDto: UpdateSiteDto = { name: 'UpdatedName' };

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdSiteId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Create Site', done => {
        request(app.getHttpServer())
            .post('/sites')
            .send(createSiteDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }: request.Response) => {
                createdSiteId = body._id;
                expect(createdSiteId).toBeDefined();
                done();
            });
    });

    it('Find All Sites', done => {
        request(app.getHttpServer())
            .get(`/sites`)
            .expect(HttpStatus.OK)
            .then(({ body }: request.Response) => {
                expect(body.length).toBeGreaterThanOrEqual(1);
                done();
            });
    });

    it('Find One Site', done => {
        request(app.getHttpServer())
            .get(`/sites/${createdSiteId}`)
            .expect(HttpStatus.OK)
            .then(({ body }: request.Response) => {
                createdSiteId = body._id;
                expect(createdSiteId).toBeDefined();
                done();
            });
    });

    it('Update Site', done => {
        request(app.getHttpServer())
            .put(`/sites/${createdSiteId}`)
            .send(updatedSiteDto)
            .expect(HttpStatus.OK)
            .then(({ body }: request.Response) => {
                createdSiteId = body._id;
                expect(createdSiteId).toBeDefined();
                expect(body.name).toBe(updatedSiteDto.name);
                done();
            });
    });

    it('Delete Site', done => {
        request(app.getHttpServer())
            .delete(`/sites/${createdSiteId}`)
            .expect(HttpStatus.ACCEPTED)
            .then(() => done());
    });

    afterAll(() => {
        disconnect();
    });
});
