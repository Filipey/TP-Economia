import { ProductDTO, ProductResponseDTO, ReportDTO } from '../../schemas/DTO'
import { Product } from '../../schemas/Models'
import { api } from '../api'

const getProductById = (id: number) => api.get<Product>(`/products/id/${id}`)

const getUserLastProducts = (userCpf: string) =>
  api.get<ProductResponseDTO[]>(`/products/user/${userCpf}`)

const getProductsChartHomeData = (userCpf: string) =>
  api.get<ProductResponseDTO[]>(`/products/user/${userCpf}/charts/home`)

const getProductsLike = (productName: { nome: string }, userCpf: string) =>
  api.post<ProductResponseDTO[]>(
    `/products/user/${userCpf}/productsLike`,
    productName
  )

const getProductReports = (id: number, cpf: string) =>
  api.get<ReportDTO[]>(`/products/id/${id}/reports/${cpf}`)

const postNewProdut = (userCpf: string, product: ProductDTO) =>
  api.post(`/products/cpf/${userCpf}`, product)

const updateProduct = (productId: number, product: ProductDTO) =>
  api.put(`/products/id/${productId}`, product)

const deleteProduct = (productId: number) =>
  api.delete(`/products/id/${productId}`)

export const ProductService = {
  getProductById,
  getUserLastProducts,
  getProductsChartHomeData,
  getProductReports,
  getProductsLike,
  postNewProdut,
  updateProduct,
  deleteProduct
}
