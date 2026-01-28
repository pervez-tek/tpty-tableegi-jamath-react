import React from 'react'
import photo from "../assets/images/markaz.png";

const About = () => {
  return (

    <div className="card shadow-lg border-0 rounded-3 text-center">
      <div className="card-header bg-light"> <img className="rounded-circle img-fluid border border-3 border-success shadow-sm" src={photo} alt="profile" style={{ width: "120px", height: "120px", objectFit: "cover" }} /> </div>

      <div className="card-body mt-4 p-4 bg-success text-white rounded">
        <p>
          <h4 className="text-start fw-bold mb-3">అప్లికేషన్ ఉద్దేశ్యం</h4>

          <p className="text-start">ఈ అప్లికేషన్ తబ్లీఘ్ జమాత్ కమ్యూనిటీకి శాంతి సంబంధిత కార్యక్రమాలను నిర్వహించడానికి మరియు సమన్వయం చేయడానికి సహాయం చేస్తుంది. ఇది వాలంటీర్లు మరియు అడ్మిన్‌లు కార్యకలాపాలను ట్రాక్ చేయడానికి, పాల్గొనే వారి వివరాలను సేకరించడానికి, మరియు దావత్ కార్యక్రమాలను బలోపేతం చేయడానికి ఉపయోగపడుతుంది.</p>

          <h5 className="text-start fw-bold mt-4">ముఖ్య ఫీచర్లు</h5>
          <ul className="text-start"><li>
            <strong>ఈవెంట్ మేనేజ్‌మెంట్:</strong> శాంతి కార్యక్రమాలను నిర్వహించడం, హాజరు వివరాలను ట్రాక్ చేయడం, పాల్గొనే వారి సమాచారాన్ని నమోదు చేయడం.
          </li><li>
              <strong>మస్జిద్ & జోన్ ట్రాకింగ్:</strong> అడ్మిన్‌లు జిల్లా వారీగా మస్జిద్‌లను జోడించి, వాటిని ప్రత్యేక జోన్‌లకు (హల్కా) కేటాయించవచ్చు.
            </li><li>
              <strong>వాలంటీర్ సపోర్ట్:</strong> వాలంటీర్లు దావత్ కార్యక్రమాలను ఫాలోఅప్ చేయడానికి మరియు పాల్గొనేవారి సంఖ్యను తెలుసుకోవడానికి సహాయం.
            </li><li>
              <strong>కమ్యూనికేషన్ ఛానల్:</strong> రిజిస్టర్ అయిన యూజర్లు ఇమెయిల్ మరియు వాట్సాప్ ద్వారా ఈవెంట్ అప్‌డేట్స్ పొందుతారు.
            </li><li>
              <strong>గూగుల్ సైన్‑ఇన్:</strong> యూజర్లు తమ గూగుల్ అకౌంట్‌తో లాగిన్ అవ్వవచ్చు. వారి వివరాలు భవిష్యత్తు సందర్శనల కోసం సేవ్ అవుతాయి, అవసరమైతే అప్‌డేట్ చేసుకోవచ్చు.
            </li><li>
              <strong>అడ్మిన్ డాష్‌బోర్డ్:</strong> అడ్మిన్‌లు సురక్షితంగా లాగిన్ అయ్యి, మస్జిద్‌లను నిర్వహించవచ్చు మరియు ఈవెంట్ గణాంకాలను పర్యవేక్షించవచ్చు.
            </li>
          </ul>
          <h5 className="text-start fw-bold mt-4">వినియోగం</h5>
          <ul className="text-start"><li>
            <strong>వాలంటీర్ల కోసం:</strong> ఈవెంట్‌లు, హాజరు, దావత్ కార్యకలాపాలను ట్రాక్ చేయడం.
          </li><li>
              <strong>అడ్మిన్‌ల కోసం:</strong> మస్జిద్‌లు, జోన్‌లు, పాల్గొనేవారి వివరాలను నిర్వహించడం.
            </li><li>
              <strong>కమ్యూనిటీ సభ్యుల కోసం:</strong> ఇమెయిల్/ఫోన్ ద్వారా రిజిస్టర్ అయ్యి, శాంతి కార్యక్రమాలలో పాల్గొనడం మరియు అప్‌డేట్స్ పొందడం.
            </li>
          </ul>
          <h5 className="text-start fw-bold mt-4">ఈ ప్లాట్‌ఫారమ్ కమ్యూనిటీ ఐక్యతను బలోపేతం చేయడానికి, సమన్వయాన్ని మెరుగుపరచడానికి, మరియు శాంతి సందేశాన్ని వ్యాప్తి చేయడానికి రూపొందించబడింది.</h5>
        </p>
      </div>

      <div className="card-body mt-4 p-4 bg-primary text-white rounded">
        <h4 className="text-start fw-bold mb-3">Purpose of the Application</h4>
        <p className="text-start">This application has been developed to support the Tableeg Jamat community in organizing and managing peace‑related events. It helps volunteers and administrators track activities, collect participant details, and strengthen Dawah efforts.</p>

        <h5 className="text-start fw-bold mt-4">Key Features</h5>
        <ul className="text-start">
          <li>
            <strong>Event Management:</strong> Organize and monitor peace events, track attendance, and record participant details.
          </li>
          <li>
            <strong>Masjid & Zone Tracking:</strong> Admins can add masjids district‑wise and assign them to specific zones (Halka).
          </li><li>
            <strong>Volunteer Support:</strong> Helps Tableeg volunteers follow up on Dawah activities and measure participation.
          </li><li>
            <strong>Communication Channel:</strong> Registered users receive updates and event broadcasts via Email and WhatsApp.
          </li><li>
            <strong> Google Sign‑In:</strong> Users can log in with their Google account for easy access. Their details are saved for future visits, allowing them to update or adjust information.
          </li><li>
            <strong>Admin Dashboard:</strong> Admins can securely log in, manage masjids, and oversee event statistics.
          </li>
        </ul>
        <h5 className="text-start fw-bold mt-4">Usage</h5>
        <ul className="text-start">
          <li>
            <strong>For Volunteers:</strong>  Track events, attendance, and Dawah activities.
          </li><li>
            <strong>For Admins:</strong> Manage masjids, zones, and participants.
          </li><li>
            <strong>For Community Members:</strong> Register with email/phone to receive updates and participate in peace events.
          </li>
        </ul>
        <h5 className="text-start fw-bold mt-4">This platform is designed to strengthen unity, improve organization, and spread the message of peace across the community.</h5>

      </div>
    </div>
  )
}



export default About