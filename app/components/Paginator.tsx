import Link from "next/link";
import { Pagination } from "../types";

export default function Paginator({pagination}:{pagination:Pagination}) {
  return (
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{pagination.skip + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(pagination.skip + pagination.itemsPerPage, pagination.totalCount)}
          </span>{" "}
          of <span className="font-medium">{pagination.totalCount}</span> results
        </p>

        <nav className="inline-flex -space-x-px rounded-md shadow-sm">
          <Link
            href={`?page=${pagination.currentPage - 1}`}
            className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
              pagination.currentPage <= 1
                ? "pointer-events-none bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </Link>
          
          <div className="px-4 py-2 text-sm font-medium border-t border-b bg-white text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>

          <Link
            href={`?page=${pagination.currentPage + 1}`}
            className={`px-4 py-2 text-sm font-medium border rounded-r-md ${
              pagination.currentPage >= pagination.totalPages
                ? "pointer-events-none bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </Link>
        </nav>
      </div>
  )
}