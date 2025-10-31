import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  bookingService,
  doctorService,
  scheduleService,
  serviceManager,
  specialtyService,
} from "../../apis/services";
import "./Booking.css";
import useAuth from "../../hooks/useAuth";
import { AppointmentTypeStep, BasicInfoStep, ConfirmationStep, DateTimeStep, DoctorInfoCard, PaymentStep, SpecialtyStep, StepperHeader } from "../../components/booking";

const steps = [
  "Specialty",
  "Appointment Type",
  "Date & Time",
  "Basic Information",
  "Payment",
  "Confirmation",
];

const Booking = () => {
  const { user } = useAuth();
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // API Data States
  const [doctor, setDoctor] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [services, setServices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  // const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [createdBooking, setCreatedBooking] = useState(null);

  // Form Data
  const [bookingData, setBookingData] = useState({
    specialtyId: null,
    serviceId: null,
    appointmentType: "Clinic",
    scheduleId: null,
    selectedDate: null,
    selectedTime: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    symptoms: "",
    reason: "",
    paymentMethod: "Cash",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [doctorData, specialtiesData, servicesData] = await Promise.all([
          doctorService.getDetails(doctorId),
          specialtyService.getAll(),
          serviceManager.getAll(),
        ]);

        setDoctor(doctorData);
        setSpecialties(specialtiesData);
        setServices(servicesData);

        if (doctorData.specialtyId) {
          setBookingData((prev) => ({
            ...prev,
            specialtyId: doctorData.specialtyId,
          }));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load booking information. Please try again.");
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchInitialData();
    }
  }, [doctorId]);

  // Fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      if (!doctorId) return;

      try {
        const schedulesData = await scheduleService.getAvailableByDoctor(
          doctorId
        );
        setSchedules(schedulesData);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    };

    fetchSchedules();
  }, [doctorId]);

  const handleNext = () => {
    if (
      activeStep === 0 &&
      (!bookingData.specialtyId || !bookingData.serviceId)
    ) {
      setError("Please select specialty and service");
      return;
    }
    if (activeStep === 2 && !bookingData.scheduleId) {
      setError("Please select date and time");
      return;
    }
    if (activeStep === 3) {
      if (
        !bookingData.firstName ||
        !bookingData.lastName ||
        !bookingData.phone ||
        !bookingData.email
      ) {
        setError("Please fill in all required fields");
        return;
      }
    }

    setError(null);
    setActiveStep((prevStep) => prevStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleScheduleSelect = (schedule) => {
    // setSelectedSchedule(schedule);
    handleInputChange("scheduleId", schedule.id);
    handleInputChange("selectedDate", schedule.date);
    handleInputChange(
      "selectedTime",
      `${schedule.startTime} - ${schedule.endTime}`
    );
  };

  console.log(user);
  const handleConfirmBooking = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // const userStr = localStorage.getItem("user");
      if (!user) {
        throw new Error("Please login to continue booking");
      }
      // const user = JSON.parse(userStr);
      const patientId = user.patientProfileId;
      console.log(patientId);
      if (!patientId) {
        throw new Error("Patient profile not found");
      }

      const bookingPayload = {
        patientId: patientId,
        doctorId: parseInt(doctorId),
        serviceId: bookingData.serviceId,
        scheduleId: bookingData.scheduleId,
      };

      console.log("Creating booking:", bookingPayload);
      const booking = await bookingService.create(bookingPayload);
      setCreatedBooking(booking);

      setActiveStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSubmitting(false);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create booking. Please try again."
      );
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <SpecialtyStep
            specialties={specialties}
            services={services}
            bookingData={bookingData}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <AppointmentTypeStep
            bookingData={bookingData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <DateTimeStep
            schedules={schedules}
            bookingData={bookingData}
            handleScheduleSelect={handleScheduleSelect}
          />
        );
      case 3:
        return (
          <BasicInfoStep
            bookingData={bookingData}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <PaymentStep
            services={services}
            bookingData={bookingData}
            doctor={doctor}
          />
        );
      case 5:
        return (
          <ConfirmationStep
            createdBooking={createdBooking}
            bookingData={bookingData}
            doctor={doctor}
            navigate={navigate}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="booking-page">
      <Container maxWidth="xl">
        <StepperHeader steps={steps} activeStep={activeStep} />

        {error && (
          <Alert
            severity="error"
            className="mb-3"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {activeStep < 5 && doctor && (
          <DoctorInfoCard doctor={doctor} />
        )}

        <Box className="booking-content">{renderStepContent()}</Box>

        {activeStep < 5 && (
          <Box className="booking-actions">
            {activeStep > 0 && (
              <Button
                variant="contained"
                onClick={handleBack}
                className="back-btn"
                startIcon={<ChevronLeft />}
                disabled={submitting}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={activeStep === 4 ? handleConfirmBooking : handleNext}
              className="next-btn"
              endIcon={activeStep < 4 ? <ChevronRight /> : null}
              disabled={submitting}
            >
              {submitting ? (
                <CircularProgress size={24} />
              ) : activeStep === 0 ? (
                "Select Appointment Type"
              ) : activeStep === 1 ? (
                "Select Date & Time"
              ) : activeStep === 2 ? (
                "Add Basic Information"
              ) : activeStep === 3 ? (
                "Review & Confirm"
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Booking;
