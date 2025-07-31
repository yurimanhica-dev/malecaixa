"use client";

import { Skeleton } from "@mui/material";

// Or your preferred skeleton component

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Area Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>

      {/* Recent Activity Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-[150px]" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-md" />
          ))}
        </div>
      </div>

      {/* Accounts Table Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-[200px]" />
        <div className="space-y-2">
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 pt-2">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
