import { Chart } from '@commons/Chart'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import useFetch from '@hooks/useFetch'
import Pagination from '@components/Pagination'
import endPoints from '@services/api'
import Modal from '@commons/Modal'
import FormProduct from '@components/FormProducts'

const PRODUCT_LIMIT = 5

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const [offsetProducts, setOffsetProducts] = useState(0)

  const products = useFetch(
    endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts),
    offsetProducts
  )
  const totalProducts = useFetch(endPoints.products.getProducts(0, 0)).length
  const categoryNames = products?.map(product => product.category)
  const categoryCount = categoryNames?.map(category => category.name)
  const countOccurrences = arr =>
    arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {})

  /*  console.log(categoryNames)
  console.log(categoryCount) */
  const chartData = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', 'c0c0c0', '#50af95', 'f3ba2f', '2a71d0']
      }
    ]
  }

  return (
    <>
      <Chart chartData={chartData} className="mb-8 mt-2" />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            List of Products
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={() => setOpen(true)}
            >
              <PlusIcon aria-hidden="true" className="-ml-1 mr-2 h-5 w-5" />
              Add Product
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Category
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Price
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Id
                    </th>

                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map(product => (
                    <tr key={`Product-item-${product?.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              alt=""
                              className="h-10 w-10 rounded-full"
                              src={product?.images[0]}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product?.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          ${product?.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product?.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a className="text-indigo-600 hover:text-indigo-900" href="/edit">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a className="text-indigo-600 hover:text-indigo-900" href="/edit">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {totalProducts > 0 && (
        <Pagination
          itemsPerPage={PRODUCT_LIMIT}
          neighbours={3}
          setOffset={setOffsetProducts}
          totalItems={totalProducts}
        />
      )}
      <Modal open={open} setOpen={setOpen}>
        <FormProduct />
      </Modal>
    </>
  )
}
