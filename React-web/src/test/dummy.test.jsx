// src/__tests__/Admindashboard.test.jsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Admindashboard from "../components/dashboard/hospital/adminDashboard";

describe("Admindashboard Component", () => {
  it("should render hospitals information correctly", () => {
    const hospitals = [
      {
        _id: "1",
        name: "Hospital 1",
        description: "Hospital 1 description",
        photo: "hospital1.jpg",
      },
      {
        _id: "2",
        name: "Hospital 2",
        description: "Hospital 2 description",
        photo: "hospital2.jpg",
      },
    ];

    const { getByText, getByAltText } = render(
      <Admindashboard hospitals={hospitals} />
    );

    hospitals.forEach((hospital) => {
      expect(getByText(hospital.name)).toBeInTheDocument();
      expect(getByText(hospital.description)).toBeInTheDocument();
      expect(getByAltText(hospital.name)).toBeInTheDocument();
    });
  });
});
