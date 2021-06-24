import "reflect-metadata";
import { Artist } from "entities/Artist";
import { Bookings } from "./Bookings";
import { Event } from "./Event";
import { Genre } from "./Genre";
import { Images } from "./Images";
import { Rooms } from "./Rooms";
import { EventArtists } from './EventArtists';
import { Transactions } from "./Transactions";
import { User } from "./User";
import { Vouchers } from "./Vouchers";

const entities = [
	Artist,
	Bookings,
	Event,
	Genre,
	Images,
	Rooms,
	EventArtists,
	Transactions,
	User,
	Vouchers
]

export default entities