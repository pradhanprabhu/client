import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Nav } from 'react-bootstrap';
import './PlacesToVisit.css';

function PlacesToVisit() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleClose = () => setShowModal(false);
  const handleShow = (place) => {
    setSelectedPlace(place);
    setShowModal(true);
  };

  const places = {
    lakes: [
      {
        name: "Phewa Lake",
        image: "https://images.unsplash.com/photo-1589308454676-21178b360ab6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The second largest lake in Nepal with stunning views of the Annapurna range.",
        location: "Pokhara, Nepal",
        bestTime: "October to March",
        fullDescription: "Phewa Lake is a freshwater lake in Pokhara that offers breathtaking reflections of the Annapurna and Dhaulagiri ranges. The lake features the famous Tal Barahi Temple on an island and is perfect for boating, fishing, and watching stunning sunsets.",
        category: "Lakes"
      },
      {
        name: "Rara Lake",
        image: "https://images.unsplash.com/photo-1589308454676-21178b360ab6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The largest and deepest lake in Nepal, known as the 'Queen of Lakes'.",
        location: "Mugu District, Nepal",
        bestTime: "September to November",
        fullDescription: "Rara Lake is a pristine alpine lake surrounded by Rara National Park. Known for its crystal-clear blue waters and stunning mountain backdrop, it's a paradise for nature lovers and photographers. The lake is home to unique fish species and migrating birds.",
        category: "Lakes"
      },
      {
        name: "Tilicho Lake",
        image: "https://images.unsplash.com/photo-1589308454676-21178b360ab6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "One of the highest lakes in the world with stunning mountain views.",
        location: "Manang District, Nepal",
        bestTime: "May to October",
        fullDescription: "Tilicho Lake is a glacial lake located at an altitude of 4,919 meters in the Annapurna range. It's known for its pristine blue waters and dramatic mountain scenery. The trek to Tilicho Lake is challenging but rewards visitors with breathtaking views and a sense of accomplishment.",
        category: "Lakes"
      }
    ],
    heritage: [
      {
        name: "Pashupatinath Temple",
        image: "https://images.unsplash.com/photo-1582653291997-079a1c04e0a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "One of the most sacred Hindu temples dedicated to Lord Shiva.",
        location: "Kathmandu, Nepal",
        bestTime: "March to October",
        fullDescription: "Pashupatinath Temple is one of the most sacred Hindu temples in the world. Located on the banks of the Bagmati River, it's a UNESCO World Heritage Site and the center of Hindu pilgrimage in Nepal. The temple complex includes various shrines, ashrams, and cremation ghats.",
        category: "Heritage"
      },
      {
        name: "Boudhanath Stupa",
        image: "https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The largest stupa in Nepal and the holiest Tibetan Buddhist temple outside Tibet.",
        location: "Kathmandu, Nepal",
        bestTime: "October to March",
        fullDescription: "Boudhanath Stupa is one of the largest stupas in the world and a UNESCO World Heritage Site. It's the center of Tibetan Buddhism in Nepal and features traditional Tibetan architecture. The stupa is surrounded by monasteries, shops, and restaurants.",
        category: "Heritage"
      },
      {
        name: "Lumbini",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The birthplace of Lord Buddha and a UNESCO World Heritage Site.",
        location: "Rupandehi District, Nepal",
        bestTime: "October to March",
        fullDescription: "Lumbini is the birthplace of Siddhartha Gautama, who later became known as Buddha. The site includes the Maya Devi Temple, various monasteries built by different countries, and the World Peace Pagoda. It's a major pilgrimage site for Buddhists worldwide.",
        category: "Heritage"
      }
    ],
    mountains: [
      {
        name: "Mount Everest",
        image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The world's highest peak and ultimate mountaineering destination.",
        location: "Solukhumbu District, Nepal",
        bestTime: "March to May, September to November",
        fullDescription: "Mount Everest, standing at 8,848.86 meters, is Earth's highest mountain above sea level. The mountain attracts climbers of all levels, from novice trekkers to experienced mountaineers. The journey to Everest Base Camp offers stunning views and an unforgettable adventure.",
        category: "Mountains"
      },
      {
        name: "Annapurna",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The tenth highest mountain and popular trekking destination.",
        location: "North-central Nepal",
        bestTime: "March to May, October to November",
        fullDescription: "The Annapurna massif includes several peaks over 7,000 meters. The Annapurna Circuit is one of the most famous treks in the world, offering diverse landscapes from subtropical forests to high-altitude deserts. The region is known for its cultural diversity and stunning mountain views.",
        category: "Mountains"
      },
      {
        name: "Machhapuchhre",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The 'Fish Tail' mountain, sacred and untouched.",
        location: "Annapurna Region, Nepal",
        bestTime: "October to November",
        fullDescription: "Machhapuchhre, also known as Fish Tail Mountain due to its distinctive shape, is considered sacred to the god Shiva. Standing at 6,993 meters, it has never been officially climbed to its peak. The mountain is best viewed from Pokhara and the surrounding areas.",
        category: "Mountains"
      }
    ],
    parks: [
      {
        name: "Chitwan National Park",
        image: "https://images.unsplash.com/photo-1605647533135-51b5906087d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Home to diverse wildlife including Bengal tigers and one-horned rhinoceros.",
        location: "Chitwan District, Nepal",
        bestTime: "October to March",
        fullDescription: "Chitwan National Park is Nepal's first national park and a UNESCO World Heritage Site. It's famous for its rich biodiversity, including Bengal tigers, one-horned rhinoceros, and various bird species. The park offers jungle safaris, elephant rides, and cultural experiences with the Tharu community.",
        category: "National Parks"
      },
      {
        name: "Sagarmatha National Park",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Home to Mount Everest and rare Himalayan wildlife.",
        location: "Solukhumbu District, Nepal",
        bestTime: "March to May, September to November",
        fullDescription: "Sagarmatha National Park, a UNESCO World Heritage Site, encompasses Mount Everest and surrounding peaks. The park protects unique Himalayan ecosystems and wildlife including snow leopards, red pandas, and Himalayan tahr. It offers world-class trekking and mountaineering opportunities.",
        category: "National Parks"
      },
      {
        name: "Langtang National Park",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "A pristine wilderness with diverse flora and fauna.",
        location: "Rasuwa District, Nepal",
        bestTime: "March to May, October to November",
        fullDescription: "Langtang National Park is the first Himalayan national park in Nepal. It features diverse landscapes from subtropical forests to alpine meadows. The park is home to red pandas, Himalayan black bears, and numerous bird species. Popular for trekking and experiencing local Tamang culture.",
        category: "National Parks"
      }
    ],
    cultural: [
      {
        name: "Bhaktapur Durbar Square",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Ancient Newar city known for its art, architecture, and culture.",
        location: "Bhaktapur, Nepal",
        bestTime: "October to March",
        fullDescription: "Bhaktapur Durbar Square is an ancient royal palace complex showcasing the rich history and architecture of the Newar people. The square features intricate wood carvings, traditional pottery squares, and historic temples. It's a living museum of medieval art and architecture.",
        category: "Cultural"
      },
      {
        name: "Thamel",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "The tourist hub of Kathmandu with vibrant streets and culture.",
        location: "Kathmandu, Nepal",
        bestTime: "Year-round",
        fullDescription: "Thamel is the tourist heart of Kathmandu, featuring narrow alleys filled with shops, restaurants, hotels, and traditional crafts. It's known for its vibrant nightlife, diverse cuisine, and shopping opportunities. The area serves as a perfect base for tourists exploring the Kathmandu Valley.",
        category: "Cultural"
      },
      {
        name: "Patan Durbar Square",
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Historic center of Patan with stunning architecture.",
        location: "Lalitpur, Nepal",
        bestTime: "October to March",
        fullDescription: "Patan Durbar Square is one of the three Durbar Squares in the Kathmandu Valley. Known for its rich cultural heritage, the square contains ancient palaces, temples, and courtyards adorned with exquisite carvings. It's a testament to the Newar architectural style and craftsmanship.",
        category: "Cultural"
      }
    ]
  };

  const getFilteredPlaces = () => {
    if (activeCategory === 'all') {
      return Object.values(places).flat();
    }
    return places[activeCategory] || [];
  };

  return (
    <div className="places-to-visit-page">
      {/* Hero Section */}
      <section className="places-hero">
        <div className="overlay"></div>
        <Container>
          <div className="hero-content text-center text-white">
            <h1>Discover Nepal</h1>
            <p className="lead">Explore the diverse beauty of the Himalayan nation</p>
          </div>
        </Container>
      </section>

      {/* Category Navigation */}
      <section className="category-section">
        <Container>
          <Nav className="category-nav justify-content-center" variant="pills">
            <Nav.Item>
              <Nav.Link 
                active={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
              >
                All Places
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeCategory === 'lakes'}
                onClick={() => setActiveCategory('lakes')}
              >
                Lakes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeCategory === 'heritage'}
                onClick={() => setActiveCategory('heritage')}
              >
                Heritage Sites
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeCategory === 'mountains'}
                onClick={() => setActiveCategory('mountains')}
              >
                Mountains
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeCategory === 'parks'}
                onClick={() => setActiveCategory('parks')}
              >
                National Parks
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeCategory === 'cultural'}
                onClick={() => setActiveCategory('cultural')}
              >
                Cultural Sites
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </section>

      {/* Places Grid */}
      <section className="places-grid-section">
        <Container>
          <Row>
            {getFilteredPlaces().map((place, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div className="place-card">
                  <div 
                    className="place-image"
                    style={{ backgroundImage: `url(${place.image})` }}
                  >
                    <div className="category-badge">{place.category}</div>
                  </div>
                  <div className="place-content">
                    <h3>{place.name}</h3>
                    <p className="location">
                      <i className="fas fa-map-marker-alt"></i> {place.location}
                    </p>
                    <p className="description">{place.description}</p>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => handleShow(place)}
                      className="mt-3"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Place Details Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlace?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlace && (
            <div className="place-details">
              <div 
                className="place-details-image"
                style={{ backgroundImage: `url(${selectedPlace.image})` }}
              ></div>
              <div className="place-details-content">
                <div className="detail-item">
                  <h4>Location</h4>
                  <p><i className="fas fa-map-marker-alt"></i> {selectedPlace.location}</p>
                </div>
                <div className="detail-item">
                  <h4>Best Time to Visit</h4>
                  <p><i className="fas fa-calendar-alt"></i> {selectedPlace.bestTime}</p>
                </div>
                <div className="detail-item">
                  <h4>Category</h4>
                  <p><i className="fas fa-tag"></i> {selectedPlace.category}</p>
                </div>
                <div className="detail-item">
                  <h4>Description</h4>
                  <p>{selectedPlace.fullDescription}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlacesToVisit; 