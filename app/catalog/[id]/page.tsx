import type { Metadata } from "next";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import CarDetails from "@/components/CarDetails/CarDetails";

import { getCarById } from "@/lib/api";
import { Car } from "@/types/car";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Car ${id} | RentalCar`,
    description: "Detailed information about rental car",
  };
}

const CarDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  const car = queryClient.getQueryData<Car>(["car", id]);

  if (!car) {
    return <p>Car not found</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetails item={car} />
    </HydrationBoundary>
  );
};

export default CarDetailsPage;
