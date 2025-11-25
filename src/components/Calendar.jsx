import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Dialog,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function Calendar() {
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events") || "[]")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleClick = (info) => {
    setDate(info.dateStr); // Get the clicked date
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    createEvent();
    setIsModalOpen(false);
  };

  const createEvent = () => {
    // Create the event object
    const newEvent = {
      id: Date.now(),
      title: title,
      start: date,
      allDay: false,
    };

    // spread operator for adding new event to existing events
    const updatedEvents = [...events, newEvent];
    // Update the state
    setEvents(updatedEvents);
    // Update local storage
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        googleCalendarApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        eventSources={[
          {
            googleCalendarId:
              "2274399d62ad15cdba71ab148665551dae39db25b1401052a0bd2e0949d35922@group.calendar.google.com",
            className: "border-red-500",
          },
          {
            events: events, // this holds all events added by the user
            className: "my-event",
          },
        ]}
        dateClick={handleClick}
        displayEventTime={false}
      />

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <form action="">
              <div className=" space-y-4">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  name="event-title"
                  className="border-0 bg-border/50 focus:ring-0 focus:border-0"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={handleSubmit}>
                Save
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
