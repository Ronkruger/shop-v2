import { Row, Col } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Product from '../components/Product'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import Paginate from '../components/Paginate.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'
import Meta from '../components/Meta.jsx'
const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();
  const {data, isLoading, error} = useGetProductsQuery({keyword, pageNumber});
  
  return (
    <>
      {!keyword ? <ProductCarousel /> : (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>)}
        {isLoading ? (
          <Loader /> //loading stage
        ) : error? (
<Message variant='info'>{error?.data?.message || error.error}</Message>
        ) :
        (
          <>
          <Meta />
           <h1>Latest products</h1>
           <Message variant='info'>hello</Message>
           <Row>
               { data.products.map((product) => (
                   <Col key={product._id} sm={12} md={16} lg={4} xl={3}>
                       <Product product={product} />
                   </Col>
               )) }
           </Row>
             <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
           </>
        ) }
         
    </>
  )
}

export default HomeScreen