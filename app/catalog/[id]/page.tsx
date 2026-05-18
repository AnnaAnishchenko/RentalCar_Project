// app/catalog/[id]/page.tsx
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import CarDetails from "@/components/CarDetails/CarDetails";

import { getCarById } from "@/lib/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CarDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  const car = queryClient.getQueryData(["car", id]);

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
