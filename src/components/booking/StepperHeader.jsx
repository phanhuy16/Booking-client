import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const StepperHeader = ({ steps, activeStep }) => (
  <Box className="booking-stepper">
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label} completed={index < activeStep}>
          <StepLabel
            StepIconComponent={() => (
              <Box
                className={`step-icon ${
                  index < activeStep
                    ? "completed"
                    : index === activeStep
                    ? "active"
                    : ""
                }`}
              >
                {index < activeStep ? (
                  <CheckCircle />
                ) : (
                  <span>{index + 1}</span>
                )}
              </Box>
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
);

export default StepperHeader;
