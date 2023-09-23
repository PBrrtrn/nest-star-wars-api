import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Coordinates {
    @Field()
    latitude: number
    @Field()
    longitude: number

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public equals(other: Coordinates): boolean {
        return this.latitude == other.latitude && this.longitude == other.longitude;
    }
}
