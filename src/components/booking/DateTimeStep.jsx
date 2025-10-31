import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Alert, Box, Button, Chip, Typography } from "@mui/material";
import { useState, useMemo } from "react";

const DateTimeStep = ({ schedules, bookingData, handleScheduleSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Helper: Format time từ TimeSpan (HH:mm:ss) sang HH:mm
  const formatTime = (timeSpan) => {
    if (!timeSpan) return "";
    const parts = timeSpan.split(":");
    return `${parts[0]}:${parts[1]}`;
  };

  // Helper: Convert time to minutes for comparison
  const timeToMinutes = (timeStr) => {
    const parts = timeStr.split(":");
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  // Helper: Categorize time slots
  const categorizeTimeSlot = (startTime) => {
    const minutes = timeToMinutes(startTime);
    if (minutes < 12 * 60) return "Morning";
    if (minutes < 17 * 60) return "Afternoon";
    return "Evening";
  };

  // Group schedules by date
  const schedulesByDate = useMemo(() => {
    const grouped = {};
    schedules.forEach((schedule) => {
      const dateKey = new Date(schedule.date).toISOString().split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(schedule);
    });
    return grouped;
  }, [schedules]);

  // Check if a date has schedules
  const hasSchedules = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    return schedulesByDate[dateKey] && schedulesByDate[dateKey].length > 0;
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Handle date selection
  const handleDateClick = (date) => {
    if (hasSchedules(date)) {
      setSelectedDate(date);
    }
  };

  // Get schedules for selected date grouped by session
  const getSchedulesForSelectedDate = () => {
    if (!selectedDate) return null;

    const dateKey = selectedDate.toISOString().split("T")[0];
    const daySchedules = schedulesByDate[dateKey] || [];

    const grouped = {
      Morning: [],
      Afternoon: [],
      Evening: [],
    };

    daySchedules.forEach((schedule) => {
      const category = categorizeTimeSlot(schedule.startTime);
      grouped[category].push(schedule);
    });

    return grouped;
  };

  const calendarDays = getCalendarDays();
  const schedulesGrouped = getSchedulesForSelectedDate();

  return (
    <Box className="booking-step">
      <Typography variant="h6" className="section-title" sx={{ mb: 3 }}>
        Select Date & Time
      </Typography>

      {schedules.length === 0 ? (
        <Alert severity="info">No available schedules for this doctor</Alert>
      ) : (
          <Box sx={{ display: "flex", gap: 3, flexWrap: { xs: "wrap", md: "nowrap" } }}>
            {/* Calendar */}
            <Box
              sx={{
                flex: "0 0 auto",
                width: { xs: "100%", md: "400px" },
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
              }}
            >
              {/* Month Navigation */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Button size="small" onClick={handlePrevMonth}>
                  <ChevronLeft />
                </Button>
                <Typography variant="h6">
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
                <Button size="small" onClick={handleNextMonth}>
                  <ChevronRight />
                </Button>
              </Box>

              {/* Calendar Grid */}
              <Box>
                {/* Weekday Headers */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <Box
                      key={day}
                      sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "text.secondary",
                      }}
                    >
                      {day}
                    </Box>
                  ))}
                </Box>

                {/* Calendar Days */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 1,
                  }}
                >
                  {calendarDays.map((date, index) => {
                    const isCurrentMonth =
                      date.getMonth() === currentMonth.getMonth();
                    const isToday =
                      date.toDateString() === new Date().toDateString();
                    const isSelected =
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString();
                    const hasAvailableSchedules = hasSchedules(date);

                    return (
                      <Box
                        key={index}
                        onClick={() => handleDateClick(date)}
                        sx={{
                          aspectRatio: "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          cursor: hasAvailableSchedules ? "pointer" : "default",
                          backgroundColor: isSelected
                            ? "primary.main"
                            : isToday
                              ? "primary.light"
                              : "transparent",
                          color: isSelected
                            ? "white"
                            : !isCurrentMonth
                              ? "text.disabled"
                              : isToday
                                ? "primary.main"
                                : "text.primary",
                          fontWeight: isSelected || isToday ? 600 : 400,
                          opacity: hasAvailableSchedules ? 1 : 0.3,
                          border: hasAvailableSchedules ? "2px solid" : "none",
                          borderColor: isSelected
                            ? "primary.main"
                            : hasAvailableSchedules
                              ? "primary.light"
                              : "transparent",
                          "&:hover": hasAvailableSchedules
                            ? {
                              backgroundColor: isSelected
                                ? "primary.dark"
                                : "action.hover",
                            }
                            : {},
                          transition: "all 0.2s",
                        }}
                      >
                        {date.getDate()}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* Time Slots */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {!selectedDate ? (
                <Alert severity="info">
                  Please select a date from the calendar to view available time
                  slots
                </Alert>
              ) : !schedulesGrouped ? (
                <Alert severity="warning">
                  No available time slots for this date
                </Alert>
              ) : (
                <Box>
                  {/* Morning */}
                  {schedulesGrouped.Morning.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        Morning
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                          gap: 1.5,
                        }}
                      >
                        {schedulesGrouped.Morning.map((schedule) => (
                          <Chip
                            key={schedule.id}
                            label={`${formatTime(schedule.startTime)} - ${formatTime(
                              schedule.endTime
                            )}`}
                            onClick={() => handleScheduleSelect(schedule)}
                            clickable
                            color={
                              bookingData.scheduleId === schedule.id
                                ? "primary"
                                : "default"
                            }
                            sx={{
                              height: "auto",
                              py: 1,
                              fontSize: "0.875rem",
                              fontWeight:
                                bookingData.scheduleId === schedule.id ? 600 : 400,
                              backgroundColor:
                                bookingData.scheduleId === schedule.id
                                  ? "primary.main"
                                  : "info.light",
                              color:
                                bookingData.scheduleId === schedule.id
                                  ? "white"
                                  : "info.dark",
                              "&:hover": {
                                backgroundColor:
                                  bookingData.scheduleId === schedule.id
                                    ? "primary.dark"
                                    : "info.main",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Afternoon */}
                  {schedulesGrouped.Afternoon.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        Afternoon
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                          gap: 1.5,
                        }}
                      >
                        {schedulesGrouped.Afternoon.map((schedule) => (
                          <Chip
                            key={schedule.id}
                            label={`${formatTime(schedule.startTime)} - ${formatTime(
                              schedule.endTime
                            )}`}
                            onClick={() => handleScheduleSelect(schedule)}
                            clickable
                            color={
                              bookingData.scheduleId === schedule.id
                                ? "primary"
                                : "default"
                            }
                            sx={{
                              height: "auto",
                              py: 1,
                              fontSize: "0.875rem",
                              fontWeight:
                                bookingData.scheduleId === schedule.id ? 600 : 400,
                              backgroundColor:
                                bookingData.scheduleId === schedule.id
                                  ? "primary.main"
                                  : "info.light",
                              color:
                                bookingData.scheduleId === schedule.id
                                  ? "white"
                                  : "info.dark",
                              "&:hover": {
                                backgroundColor:
                                  bookingData.scheduleId === schedule.id
                                    ? "primary.dark"
                                    : "info.main",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Evening */}
                  {schedulesGrouped.Evening.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        Evening
                      </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                              gap: 1.5,
                            }}
                          >
                            {schedulesGrouped.Evening.map((schedule) => (
                              <Chip
                                key={schedule.id}
                                label={`${formatTime(schedule.startTime)} - ${formatTime(
                                  schedule.endTime
                                )}`}
                                onClick={() => handleScheduleSelect(schedule)}
                                clickable
                                color={
                                  bookingData.scheduleId === schedule.id
                                    ? "primary"
                                    : "default"
                                }
                                sx={{
                                  height: "auto",
                                  py: 1,
                                  fontSize: "0.875rem",
                                  fontWeight:
                                    bookingData.scheduleId === schedule.id ? 600 : 400,
                                  backgroundColor:
                                    bookingData.scheduleId === schedule.id
                                      ? "primary.main"
                                      : "info.light",
                                  color:
                                    bookingData.scheduleId === schedule.id
                                      ? "white"
                                      : "info.dark",
                                  "&:hover": {
                                    backgroundColor:
                                      bookingData.scheduleId === schedule.id
                                        ? "primary.dark"
                                        : "info.main",
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
      )}
    </Box>
  );
};

export default DateTimeStep;