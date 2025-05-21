import { Meta } from "./meta";
import { Track } from "./track";

export type TrackListResponse = {
	data: Track[];
	meta: Meta;
};