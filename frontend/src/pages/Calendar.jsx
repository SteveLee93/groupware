import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Paper } from '@mui/material';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchEvents, createEvent } from '../store/calendarSlice';
import EventDialog from '../components/calendar/EventDialog';

const locales = {
  'ko': ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Calendar() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.calendar);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
    setIsDialogOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    if (selectedEvent?.id) {
      // 이벤트 수정 로직
    } else {
      await dispatch(createEvent(eventData));
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)' }}>
      <Paper sx={{ p: 2, height: '100%' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day']}
          messages={{
            next: "다음",
            previous: "이전",
            today: "오늘",
            month: "월",
            week: "주",
            day: "일"
          }}
        />
      </Paper>

      <EventDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </Box>
  );
}

export default Calendar;
