import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

// Import event images
import summitImg from "../../assets/skillbuilder1.webp";
import workshopImg from "../../assets/workshop.webp";
import networkingImg from "../../assets/wokshop3.webp";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Skills Development Summit 2024",
      date: "2024-03-15",
      time: "09:00 - 17:00",
      location: "Sandton Convention Centre, Johannesburg",
      attendees: 250,
      description:
        "Annual summit bringing together SDPs, Assessors, and Moderators to discuss industry trends and innovations.",
      image: summitImg
    },
    {
      id: 2,
      title: "Digital Accreditation Workshop",
      date: "2024-02-28",
      time: "14:00 - 16:00",
      location: "Online (Zoom)",
      attendees: 100,
      description:
        "Learn about streamlining accreditation processes using digital tools and platforms.",
      image: workshopImg
    },
    {
      id: 3,
      title: "Practitioner Networking Mixer",
      date: "2024-03-08",
      time: "18:00 - 21:00",
      location: "The Vineyard Hotel, Cape Town",
      attendees: 80,
      description:
        "Connect with fellow Assessors and Moderators in a relaxed networking environment.",
      image: networkingImg
    }
  ];

  // ✅ Add this back
  const pastEvents = [
    {
      id: 4,
      title: "SETA Compliance Seminar",
      date: "2024-01-20",
      location: "Durban",
      attendees: 150,
      description:
        "Comprehensive overview of SETA compliance requirements for 2024."
    },
    {
      id: 5,
      title: "Technology in Skills Development",
      date: "2023-12-10",
      location: "Online",
      attendees: 200,
      description:
        "Exploring how technology is transforming skills development practices."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-600">
          Events & Webinars
        </h1>

        <p className="text-lg text-gray-700 mb-12 text-center">
          Join us for industry-leading events, workshops, and networking opportunities in the skills development sector.
        </p>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{event.title}</h3>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center">
                      <FaClock className="mr-2 text-green-500" />
                      {event.time}
                    </div>

                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      {event.location}
                    </div>

                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-purple-500" />
                      {event.attendees} expected attendees
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{event.description}</p>

                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Past Events</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              {pastEvents.map((event) => (
                <div key={event.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>

                    <div className="text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <FaCalendarAlt className="mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>

                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="mr-2" />
                        {event.location}
                      </div>

                      <div className="flex items-center">
                        <FaUsers className="mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Host Your Event With Us</h2>
          <p className="mb-6 text-lg">
            Partner with SkillLinker to reach the skills development community. We offer event hosting, promotion, and networking opportunities.
          </p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </section>
      </div>
    </div>
  );
};

export default Events;
