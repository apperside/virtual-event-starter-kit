import { EntitySchema } from 'typeorm';
import "reflect-metadata";
import { Artist } from "entities/Artist";
import { Booking } from "./Bookings";
import { Event } from "./Event";
import { Genre } from "./Genre";
import { Images } from "./Images";
import { Rooms } from "./Rooms";
import { EventArtists } from './EventArtists';
import { Transactions } from "./Transactions";
import { User } from "./User";
import { Vouchers } from "./Vouchers";
import { UserSchema } from "next-auth-models/User";

const entities = [
	User,//new EntitySchema(UserSchema),
	Booking,
	Artist,
	Event,
	Genre,
	Images,
	Rooms,
	EventArtists,
	Transactions,
	Vouchers
]

export default entities