import React from 'react'
import PublicNavbar from './PublicNavbar';

function PublicHome() {
    return (
      <div className='all-page'>
        <div>
            <PublicNavbar/>
        </div>
        <section id='home' className='section-home'>
          <div className='div-home'>
            <img className='home-img' src='/images/mhc-image2.jpg' alt='img1' />
            <div>
              <h1>MHC Holistic Clinic</h1>  
              <p>Pellentesque imperdiet, odio id dapibus dictum, felis diam hendrerit turpis, auctor elementum ex quam sed nibh. Morbi ut hendrerit orci, ut tincidunt felis. Suspendisse fermentum mi leo, sed gravida lorem tempor eu. Mauris neque lorem, molestie at massa nec, tempus congue justo. Nulla tristique ornare enim eu dapibus. Aliquam dictum nisi et suscipit ultrices. Donec venenatis id elit eget lobortis.</p>
            </div>
          </div>
        </section>
        <section id='treatments' className='section-treatments'>
          <div className='div-treatments'>
            <div className='treatments'>
              <h1>Tratamentos</h1>
              <p>Fusce placerat augue nec arcu condimentum, id sollicitudin arcu luctus. Curabitur a nisi elit. Etiam et mi eget arcu posuere auctor. Suspendisse potenti. Fusce condimentum eget ante sit amet bibendum.</p>
              <ul>
                <li>Quisquam</li>
                <li>Dolorem</li>
                <li>Consectetur</li>
                <li>Quisquam est qui</li>
                <li>Adipisci velit</li>
              </ul>
            </div>
            <img className='treatments-img' src='/images/mhc-image3.jpg' alt='img1' />
          </div>
        </section>
        <section id='professionals' className='section-professionals'>
          <div className='div-professionals'>
            <img className='professionals-img' src='/images/mhc-image4.jpg' alt='img1' />
            <div>
              <h1>Nossos Profissionais</h1>  
              <p>Integer porta interdum est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ut euismod diam. Mauris fringilla vitae lectus ac porttitor. Nulla facilisi. Sed vel interdum turpis. Sed augue ex, consequat sed turpis non, laoreet volutpat nisi. Quisque at pulvinar felis. Vestibulum et viverra tellus, eget venenatis dolor. </p>
            </div>
          </div>
        </section>
        <footer id='contact' className='footer'>
          <div>
            <h3>Quisque at pulvinar felis!</h3>
            <p>Telefone: 224-247-5150</p>
            <p>Email: contato@mhc.com</p>
            <p>Endereço: Aenean Turpis Urna, 745 - Viverra Sed</p>
          </div>
          <img className='footer-logo-img' src='/images/logo-home.png' alt='img1' />
        </footer>
      </div>  
    );
  }
  
  export default PublicHome;