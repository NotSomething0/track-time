import type { APIRoute } from "astro";
import { getEvent} from '../../database/getEvent';

export const POST: APIRoute = async({ request, session }) => {
  const payload = await request.json();
  const eventId = payload?.eventId;

  if (!eventId) {
    return new Response('You must specify an eventId', { status: 500 })
  }

  

  if (!session) {
    return new Response('', { status: 401 })
  }

  const event = getEvent(eventId)

  return new Response(JSON.stringify(event), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}