// src/components/doctors/DoctorTabs.jsx
import { Paper, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import OverviewTab from './OverviewTab';
import AboutTab from './AboutTab';
import SchedulesTab from './SchedulesTab';
import FeedbackSection from './FeedbackSection';
import { RateReview } from '@mui/icons-material';

const DoctorTabs = ({ doctor, schedules, onBook, doctorId }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}
      >
        <Tab label="Tổng quan" />
        <Tab label="Giới thiệu" />
        <Tab label={`Lịch khám (${schedules.length})`} />
        <Tab label={`Đánh giá (${doctor.totalFeedbacks})`} icon={<RateReview fontSize="small" />}
          iconPosition="start" />
      </Tabs>

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {activeTab === 0 && <OverviewTab doctor={doctor} />}
        {activeTab === 1 && <AboutTab doctor={doctor} />}
        {activeTab === 2 && <SchedulesTab schedules={schedules} onBook={onBook} />}
        {activeTab === 3 && <FeedbackSection doctorId={doctorId} doctorName={doctor.fullName} />}
      </Box>
    </Paper>
  );
};

export default DoctorTabs;