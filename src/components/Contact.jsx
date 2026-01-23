import React from 'react'
import photo from "../assets/images/photo.png";
import "./contact.css";

const Contact = () => {




  return (
    <div className="card text-center">
      <img className="rounded-circle img-fluid" src={photo} alt="profile" />

      <div className="card-body">
        <h4 className="card-title fs-4 fs-md-3 fs-lg-2">Pervez Mohammad</h4>
        <p className="card-text">Software Architect and Engineer...</p>

      </div>

      <div className="mt-4 pt-5 pb-5 px-3 bg-success text-white rounded">
        <p>నేను సాఫ్ట్‌వేర్ అభివృద్ధి పట్ల ఎంతో ఉత్సాహం మరియు ఆసక్తి కలిగిన డెవలపర్‌ను. సాంకేతికతను మంచి ఉద్దేశంతో ఉపయోగిస్తే సమాజానికి ఉపయోగపడుతుందనే నమ్మకం నాకు ఉంది. అల్లాహ్ (సుబ్హానహు వ తఆలా) కృపతో, నా సాంకేతిక నైపుణ్యాలను ముస్లిం సమాజ సేవకు వినియోగించాలనే ఆశయం నాకు ఉంది.

          ఈ ఉద్దేశంతో, దావత్-ఏ-తబ్లీగ్ కార్యాన్ని సులభతరం చేయడానికి మరియు నిర్వహణలో సహాయపడే విధంగా టబ్లీఘీ జమాత్ కోసం ఒక సాఫ్ట్‌వేర్‌ను అభివృద్ధి చేస్తున్నాను. ఇది వాణిజ్య లాభాల కోసం కాకుండా, నిజమైన నియ్యత్‌తో సమాజానికి ఉపయోగపడాలనే సంకల్పంతో చేస్తున్న ప్రయత్నం, ఇన్ షా అల్లాహ్. </p>
      </div>

      <div className="mt-4 pt-5 pb-5 px-3 bg-primary text-white rounded">
        <p>I am an enthusiastic and passionate software developer who believes in using technology for meaningful impact. By the grace of Allah (Subhanahu wa Ta’ala), I aspire to use my technical skills in service of the Muslim community.
          With this intention, I am working on a software solution for Tableeghi Jamaath to support Da’wah-e-Tableegh by simplifying and organizing the invitation process. This initiative is driven by sincere niyyah and a desire to contribute positively through technology, In shaa Allah. </p>
      </div>
    </div>
  )
}

export default Contact