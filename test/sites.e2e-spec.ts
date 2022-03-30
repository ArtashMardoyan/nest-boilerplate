import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { CreateSiteDto } from '../src/modules/sites/dto/create-site.dto';
import { UpdateSiteDto } from '../src/modules/sites/dto/update-site.dto';
import { AuthDto } from '../src/modules/auth/dto/auth.dto';
import { AppModule } from '../src/app.module';

const loginDto: AuthDto = { login: 'johndoe@gmail.com', password: 'hunter' };
const createSiteDto: CreateSiteDto = { name: 'Name', address: 'Address', description: 'Description' };
const updatedSiteDto: UpdateSiteDto = { name: 'UpdatedName' };

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdSiteId: string;
    let accessToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
        accessToken = `Bearer ${body.accessToken}`;
    });

    it('Create Site', done => {
        request(app.getHttpServer())
            .post('/sites')
            .send(createSiteDto)
            .set('Authorization', accessToken)
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
            .set('Authorization', accessToken)
            .then(({ body }: request.Response) => {
                expect(body.docs.length).toBeGreaterThanOrEqual(1);
                done();
            });
    });

    it('Find One Site', done => {
        request(app.getHttpServer())
            .get(`/sites/${createdSiteId}`)
            .expect(HttpStatus.OK)
            .set('Authorization', accessToken)
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
            .set('Authorization', accessToken)
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
            .set('Authorization', accessToken)
            .then(() => done());
    });

    afterAll(() => {
        disconnect();
    });
});
