import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1659817816367 implements MigrationInterface {
    name = 'migrations1659817816367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_56f1996fc2983d1895e4a8f3af3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourite_artists_artist" ("favouriteId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_21868ced9b3b3b285b9423bb418" PRIMARY KEY ("favouriteId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8de889bfc8afaa9954d9de4e49" ON "favourite_artists_artist" ("favouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f2f75d2f6503a013fbc50012f" ON "favourite_artists_artist" ("artistId") `);
        await queryRunner.query(`CREATE TABLE "favourite_albums_album" ("favouriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_95dd93ea3c968f5c051e03b4732" PRIMARY KEY ("favouriteId", "albumId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea0ff1b0dec80bd439837537f1" ON "favourite_albums_album" ("favouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_956f86be097b660e57fc35e9ab" ON "favourite_albums_album" ("albumId") `);
        await queryRunner.query(`CREATE TABLE "favourite_tracks_track" ("favouriteId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_39a0fdf6d7b0eb61e05b73f8cfa" PRIMARY KEY ("favouriteId", "trackId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c274c4156ed9586fb2e8e8e96" ON "favourite_tracks_track" ("favouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_955d9ade05edb669ebe15e188c" ON "favourite_tracks_track" ("trackId") `);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" ADD CONSTRAINT "FK_8de889bfc8afaa9954d9de4e49d" FOREIGN KEY ("favouriteId") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" ADD CONSTRAINT "FK_3f2f75d2f6503a013fbc50012f2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" ADD CONSTRAINT "FK_ea0ff1b0dec80bd439837537f19" FOREIGN KEY ("favouriteId") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" ADD CONSTRAINT "FK_956f86be097b660e57fc35e9abe" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" ADD CONSTRAINT "FK_0c274c4156ed9586fb2e8e8e966" FOREIGN KEY ("favouriteId") REFERENCES "favourite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" ADD CONSTRAINT "FK_955d9ade05edb669ebe15e188cb" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" DROP CONSTRAINT "FK_955d9ade05edb669ebe15e188cb"`);
        await queryRunner.query(`ALTER TABLE "favourite_tracks_track" DROP CONSTRAINT "FK_0c274c4156ed9586fb2e8e8e966"`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" DROP CONSTRAINT "FK_956f86be097b660e57fc35e9abe"`);
        await queryRunner.query(`ALTER TABLE "favourite_albums_album" DROP CONSTRAINT "FK_ea0ff1b0dec80bd439837537f19"`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" DROP CONSTRAINT "FK_3f2f75d2f6503a013fbc50012f2"`);
        await queryRunner.query(`ALTER TABLE "favourite_artists_artist" DROP CONSTRAINT "FK_8de889bfc8afaa9954d9de4e49d"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_955d9ade05edb669ebe15e188c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c274c4156ed9586fb2e8e8e96"`);
        await queryRunner.query(`DROP TABLE "favourite_tracks_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_956f86be097b660e57fc35e9ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea0ff1b0dec80bd439837537f1"`);
        await queryRunner.query(`DROP TABLE "favourite_albums_album"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f2f75d2f6503a013fbc50012f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8de889bfc8afaa9954d9de4e49"`);
        await queryRunner.query(`DROP TABLE "favourite_artists_artist"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "favourite"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "track"`);
    }

}
