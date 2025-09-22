import { API_CONFIG } from '@/config/api';

export interface AuditFramework {
  framework_id: string;
  framework_name: string;
}

export interface AuditFrameworksResponse {
  frameworks: AuditFramework[];
}

export interface AssessmentControl {
  status: string;
  owner: string;
  control_id: string;
  comments: any[];
  evidence: any[];
  insights: string;
  lastupdate: string;
  description: string;
  control_name: string;
  internal_review_status: string;
  evidence_required: string;
  section_id: string;
  category: string;
  compliance_status: string;
}

export interface AssessmentData {
  cloudmates: string;
  end_date: string;
  start_date: string;
  Assessments_id: string;
  Organisation_id: string;
  Status: string;
  framework_id: string;
  controls: AssessmentControl[];
}

export interface AssessmentResponse {
  records: AssessmentData[];
}

export const fetchAuditFrameworks = async (): Promise<AuditFramework[]> => {
  // Return fallback data immediately - API is not working
  console.log('Using fallback data from screenshots');
  return [
    {
      framework_id: "PDPL_SA_1",
      framework_name: "Personal Data Protection Law - Saudi Arabia"
    },
    {
      framework_id: "PDPL_SA_2", 
      framework_name: "Personal Data Protection Law - Saudi Arabia"
    },
    {
      framework_id: "PDPL_SA_3",
      framework_name: "Personal Data Protection Law - Saudi Arabia"
    }
  ];
};

export const fetchAssessmentData = async (frameworkId?: string): Promise<AssessmentData | null> => {
  // Return fallback data immediately - API is not working
  console.log('Using fallback assessment data from screenshots');
    
    // Return different data based on framework ID with comprehensive controls
    const getControlsForFramework = (fwId: string) => {
      const baseControls = [
        // PDPL Data Protection Governance Controls
        {
          status: "Internally Reviewed",
          owner: "sumit@cloudmates.me",
          control_id: "001",
          comments: [],
          evidence: [],
          insights: "Data Protection Governance framework ensures comprehensive oversight and accountability.",
          lastupdate: "2025-04-09",
          description: "Data Protection Governance framework implementation and oversight.",
          control_name: "Data Protection Governance",
          internal_review_status: "Internally Reviewed",
          evidence_required: "Governance framework, oversight documentation, accountability measures.",
          section_id: "PDPL-GOV",
          category: "Governance",
          compliance_status: "Internally Reviewed"
        },
        {
          status: "Internally Reviewed",
          owner: "sumit@cloudmates.me",
          control_id: "002",
          comments: [],
          evidence: [],
          insights: "Data Protection Governance oversight requires continuous monitoring and updates.",
          lastupdate: "2025-07-28",
          description: "Data Protection Governance oversight and monitoring procedures.",
          control_name: "Data Protection Governance",
          internal_review_status: "Internally Reviewed",
          evidence_required: "Oversight procedures, monitoring reports, update documentation.",
          section_id: "PDPL-GOV",
          category: "Governance",
          compliance_status: "Internally Reviewed"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "003",
          comments: [],
          evidence: [],
          insights: "Data Protection Governance implementation requires structured approach.",
          lastupdate: "2025-08-04",
          description: "Data Protection Governance implementation and compliance measures.",
          control_name: "Data Protection Governance",
          internal_review_status: "Initial",
          evidence_required: "Implementation plans, compliance documentation, governance policies.",
          section_id: "PDPL-GOV",
          category: "Governance",
          compliance_status: "Initial"
        },
        
        // PDPL Data Protection Officer Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "004",
          comments: [],
          evidence: [],
          insights: "Data Protection Officer appointment and responsibilities must be clearly defined.",
          lastupdate: "2025-04-08",
          description: "Data Protection Officer (DPO) appointment and role definition.",
          control_name: "Data Protection Officer (DPO)",
          internal_review_status: "Initial",
          evidence_required: "DPO appointment letters, role descriptions, responsibility matrices.",
          section_id: "PDPL-DPO",
          category: "Governance",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "005",
          comments: [],
          evidence: [],
          insights: "Data Protection Officer oversight and reporting mechanisms.",
          lastupdate: "2025-04-08",
          description: "Data Protection Officer (DPO) oversight and reporting procedures.",
          control_name: "Data Protection Officer (DPO)",
          internal_review_status: "Initial",
          evidence_required: "Oversight procedures, reporting templates, communication protocols.",
          section_id: "PDPL-DPO",
          category: "Governance",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "006",
          comments: [],
          evidence: [],
          insights: "Data Protection Officer training and competency requirements.",
          lastupdate: "2025-05-09",
          description: "Data Protection Officer (DPO) training and competency management.",
          control_name: "Data Protection Officer (DPO)",
          internal_review_status: "Initial",
          evidence_required: "Training records, competency assessments, certification documents.",
          section_id: "PDPL-DPO",
          category: "Training",
          compliance_status: "Initial"
        },
        
        // PDPL Privacy Policy Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "007",
          comments: [],
          evidence: [],
          insights: "Privacy policy development and implementation requirements.",
          lastupdate: "2025-04-08",
          description: "Privacy policy development, content requirements, and implementation.",
          control_name: "Privacy Policy",
          internal_review_status: "Initial",
          evidence_required: "Privacy policy documents, implementation procedures, review records.",
          section_id: "PDPL-PRIVACY",
          category: "Documentation",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "008",
          comments: [],
          evidence: [],
          insights: "Privacy policy communication and accessibility requirements.",
          lastupdate: "2025-04-08",
          description: "Privacy policy communication, publication, and accessibility measures.",
          control_name: "Privacy Policy",
          internal_review_status: "Initial",
          evidence_required: "Communication records, publication evidence, accessibility compliance.",
          section_id: "PDPL-PRIVACY",
          category: "Documentation",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "009",
          comments: [],
          evidence: [],
          insights: "Privacy policy maintenance and update procedures.",
          lastupdate: "2025-04-08",
          description: "Privacy policy maintenance, version control, and update procedures.",
          control_name: "Privacy Policy",
          internal_review_status: "Initial",
          evidence_required: "Version control logs, update procedures, maintenance schedules.",
          section_id: "PDPL-PRIVACY",
          category: "Documentation",
          compliance_status: "Initial"
        },
        
        // PDPL Employee Awareness & Training Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "010",
          comments: [],
          evidence: [],
          insights: "Employee awareness and training program development.",
          lastupdate: "2025-05-05",
          description: "Employee Awareness & Training program development and delivery.",
          control_name: "Employee Awareness & Training",
          internal_review_status: "Initial",
          evidence_required: "Training programs, delivery schedules, awareness materials.",
          section_id: "PDPL-TRAINING",
          category: "Training",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "011",
          comments: [],
          evidence: [],
          insights: "Employee training effectiveness and competency assessment.",
          lastupdate: "2025-04-08",
          description: "Employee Awareness & Training effectiveness measurement and assessment.",
          control_name: "Employee Awareness & Training",
          internal_review_status: "Initial",
          evidence_required: "Assessment results, competency records, effectiveness metrics.",
          section_id: "PDPL-TRAINING",
          category: "Training",
          compliance_status: "Initial"
        },
        
        // PDPL Data Collection & Processing Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "101",
          comments: [],
          evidence: [],
          insights: "Data collection practices and compliance requirements.",
          lastupdate: "2025-04-08",
          description: "Data Collection & Processing practices and compliance procedures.",
          control_name: "Data Collection & Processing",
          internal_review_status: "Initial",
          evidence_required: "Collection procedures, processing documentation, compliance records.",
          section_id: "PDPL-COLLECTION",
          category: "Data Processing",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "102",
          comments: [],
          evidence: [],
          insights: "Data processing monitoring and oversight procedures.",
          lastupdate: "2025-04-08",
          description: "Data Collection & Processing monitoring and oversight mechanisms.",
          control_name: "Data Collection & Processing",
          internal_review_status: "Initial",
          evidence_required: "Monitoring procedures, oversight reports, processing logs.",
          section_id: "PDPL-COLLECTION",
          category: "Data Processing",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "103",
          comments: [],
          evidence: [],
          insights: "Data processing transparency and accountability measures.",
          lastupdate: "2025-05-05",
          description: "Data Collection & Processing transparency and accountability frameworks.",
          control_name: "Data Collection & Processing",
          internal_review_status: "Initial",
          evidence_required: "Transparency reports, accountability frameworks, process documentation.",
          section_id: "PDPL-COLLECTION",
          category: "Data Processing",
          compliance_status: "Initial"
        },
        
        // PDPL Legal Basis for Processing Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "104",
          comments: [],
          evidence: [],
          insights: "Legal basis identification and documentation requirements.",
          lastupdate: "2025-04-08",
          description: "Legal Basis for Processing identification and documentation.",
          control_name: "Legal Basis for Processing",
          internal_review_status: "Initial",
          evidence_required: "Legal basis documentation, identification procedures, compliance records.",
          section_id: "PDPL-LEGAL",
          category: "Legal Compliance",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "105",
          comments: [],
          evidence: [],
          insights: "Legal basis validation and review procedures.",
          lastupdate: "2025-04-08",
          description: "Legal Basis for Processing validation and review mechanisms.",
          control_name: "Legal Basis for Processing",
          internal_review_status: "Initial",
          evidence_required: "Validation procedures, review reports, legal assessments.",
          section_id: "PDPL-LEGAL",
          category: "Legal Compliance",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "106",
          comments: [],
          evidence: [],
          insights: "Legal basis compliance monitoring and updates.",
          lastupdate: "2025-04-08",
          description: "Legal Basis for Processing compliance monitoring and update procedures.",
          control_name: "Legal Basis for Processing",
          internal_review_status: "Initial",
          evidence_required: "Monitoring reports, update procedures, compliance tracking.",
          section_id: "PDPL-LEGAL",
          category: "Legal Compliance",
          compliance_status: "Initial"
        },
        
        // PDPL Data Subject Rights Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "107",
          comments: [],
          evidence: [],
          insights: "Data subject rights implementation and response procedures.",
          lastupdate: "2025-04-08",
          description: "Data Subject Rights implementation and response mechanisms.",
          control_name: "Data Subject Rights",
          internal_review_status: "Initial",
          evidence_required: "Rights procedures, response templates, implementation documentation.",
          section_id: "PDPL-RIGHTS",
          category: "Data Rights",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "108",
          comments: [],
          evidence: [],
          insights: "Data subject rights fulfillment and tracking systems.",
          lastupdate: "2025-04-08",
          description: "Data Subject Rights fulfillment tracking and management systems.",
          control_name: "Data Subject Rights",
          internal_review_status: "Initial",
          evidence_required: "Tracking systems, fulfillment records, management procedures.",
          section_id: "PDPL-RIGHTS",
          category: "Data Rights",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "109",
          comments: [],
          evidence: [],
          insights: "Data subject rights communication and support procedures.",
          lastupdate: "2025-04-08",
          description: "Data Subject Rights communication and support mechanisms.",
          control_name: "Data Subject Rights",
          internal_review_status: "Initial",
          evidence_required: "Communication procedures, support documentation, response protocols.",
          section_id: "PDPL-RIGHTS",
          category: "Data Rights",
          compliance_status: "Initial"
        },
        
        // PDPL Data Retention & Destruction Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "110",
          comments: [],
          evidence: [],
          insights: "Data retention and destruction policies and procedures.",
          lastupdate: "2025-04-08",
          description: "Data Retention & Destruction policies and implementation procedures.",
          control_name: "Data Retention & Destruction",
          internal_review_status: "Initial",
          evidence_required: "Retention policies, destruction procedures, implementation records.",
          section_id: "PDPL-RETENTION",
          category: "Data Management",
          compliance_status: "Initial"
        },
        
        // PDPL Data Security Measures Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "201",
          comments: [],
          evidence: [],
          insights: "Data security measures implementation and monitoring.",
          lastupdate: "2025-04-08",
          description: "Data Security Measures implementation and effectiveness monitoring.",
          control_name: "Data Security Measures",
          internal_review_status: "Initial",
          evidence_required: "Security measures, implementation records, monitoring reports.",
          section_id: "PDPL-SECURITY",
          category: "Security",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "202",
          comments: [],
          evidence: [],
          insights: "Data security controls and access management systems.",
          lastupdate: "2025-04-08",
          description: "Data Security Measures controls and access management implementation.",
          control_name: "Data Security Measures",
          internal_review_status: "Initial",
          evidence_required: "Security controls, access management systems, implementation documentation.",
          section_id: "PDPL-SECURITY",
          category: "Security",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "203",
          comments: [],
          evidence: [],
          insights: "Data security assessment and improvement procedures.",
          lastupdate: "2025-04-08",
          description: "Data Security Measures assessment and continuous improvement processes.",
          control_name: "Data Security Measures",
          internal_review_status: "Initial",
          evidence_required: "Security assessments, improvement plans, process documentation.",
          section_id: "PDPL-SECURITY",
          category: "Security",
          compliance_status: "Initial"
        },
        
        // PDPL Data Breach Management Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "204",
          comments: [],
          evidence: [],
          insights: "Data breach detection and response procedures.",
          lastupdate: "2025-04-08",
          description: "Data Breach Management detection and initial response procedures.",
          control_name: "Data Breach Management",
          internal_review_status: "Initial",
          evidence_required: "Detection procedures, response plans, initial response documentation.",
          section_id: "PDPL-BREACH",
          category: "Incident Management",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "205",
          comments: [],
          evidence: [],
          insights: "Data breach notification and communication procedures.",
          lastupdate: "2025-04-08",
          description: "Data Breach Management notification and communication protocols.",
          control_name: "Data Breach Management",
          internal_review_status: "Initial",
          evidence_required: "Notification procedures, communication protocols, stakeholder contact lists.",
          section_id: "PDPL-BREACH",
          category: "Incident Management",
          compliance_status: "Initial"
        },
        
        // PDPL Third-Party Data Sharing Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "206",
          comments: [],
          evidence: [],
          insights: "Third-party data sharing agreements and oversight procedures.",
          lastupdate: "2025-04-08",
          description: "Third-Party Data Sharing agreements and oversight mechanisms.",
          control_name: "Third-Party Data Sharing",
          internal_review_status: "Initial",
          evidence_required: "Sharing agreements, oversight procedures, compliance documentation.",
          section_id: "PDPL-THIRDPARTY",
          category: "Vendor Management",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "207",
          comments: [],
          evidence: [],
          insights: "Third-party data sharing monitoring and compliance verification.",
          lastupdate: "2025-04-08",
          description: "Third-Party Data Sharing monitoring and compliance verification processes.",
          control_name: "Third-Party Data Sharing",
          internal_review_status: "Initial",
          evidence_required: "Monitoring procedures, compliance reports, verification documentation.",
          section_id: "PDPL-THIRDPARTY",
          category: "Vendor Management",
          compliance_status: "Initial"
        },
        
        // PDPL Cross-Border Data Transfers Controls
        {
          status: "Evidence Submitted",
          owner: "sumit@cloudmates.me",
          control_id: "208",
          comments: [],
          evidence: [],
          insights: "Cross-border data transfer mechanisms and compliance procedures.",
          lastupdate: "2025-04-09",
          description: "Cross-Border Data Transfers mechanisms and compliance frameworks.",
          control_name: "Cross-Border Data Transfers",
          internal_review_status: "Evidence Submitted",
          evidence_required: "Transfer mechanisms, compliance frameworks, adequacy assessments.",
          section_id: "PDPL-CROSSBORDER",
          category: "International Transfers",
          compliance_status: "Evidence Submitted"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "209",
          comments: [],
          evidence: [],
          insights: "Cross-border transfer monitoring and compliance assessment.",
          lastupdate: "2025-04-08",
          description: "Cross-Border Data Transfers monitoring and compliance assessment procedures.",
          control_name: "Cross-Border Data Transfers",
          internal_review_status: "Initial",
          evidence_required: "Monitoring procedures, compliance assessments, transfer documentation.",
          section_id: "PDPL-CROSSBORDER",
          category: "International Transfers",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "210",
          comments: [],
          evidence: [],
          insights: "Data breach remediation and improvement procedures.",
          lastupdate: "2025-04-08",
          description: "Data Breach Management remediation and continuous improvement processes.",
          control_name: "Data Breach Management",
          internal_review_status: "Initial",
          evidence_required: "Remediation procedures, improvement plans, lessons learned documentation.",
          section_id: "PDPL-BREACH",
          category: "Incident Management",
          compliance_status: "Initial"
        },
        
        // PDPL DPIA Process Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "301",
          comments: [],
          evidence: [],
          insights: "Data Protection Impact Assessment process implementation.",
          lastupdate: "2025-04-08",
          description: "DPIA Process implementation and execution procedures.",
          control_name: "DPIA Process",
          internal_review_status: "Initial",
          evidence_required: "DPIA procedures, process documentation, implementation guides.",
          section_id: "PDPL-DPIA",
          category: "Risk Assessment",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "302",
          comments: [],
          evidence: [],
          insights: "DPIA review and approval procedures.",
          lastupdate: "2025-04-08",
          description: "DPIA Process review, validation, and approval mechanisms.",
          control_name: "DPIA Process",
          internal_review_status: "Initial",
          evidence_required: "Review procedures, validation criteria, approval documentation.",
          section_id: "PDPL-DPIA",
          category: "Risk Assessment",
          compliance_status: "Initial"
        },
        
        // PDPL Internal Audits & Monitoring Controls
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "401",
          comments: [],
          evidence: [],
          insights: "Internal audit and monitoring program implementation.",
          lastupdate: "2025-07-30",
          description: "Internal Audits & Monitoring program development and execution.",
          control_name: "Internal Audits & Monitoring",
          internal_review_status: "Initial",
          evidence_required: "Audit programs, monitoring procedures, execution documentation.",
          section_id: "PDPL-AUDIT",
          category: "Audit & Monitoring",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "402",
          comments: [],
          evidence: [],
          insights: "Internal audit reporting and corrective action procedures.",
          lastupdate: "2025-04-08",
          description: "Internal Audits & Monitoring reporting and corrective action management.",
          control_name: "Internal Audits & Monitoring",
          internal_review_status: "Initial",
          evidence_required: "Audit reports, corrective action plans, management responses.",
          section_id: "PDPL-AUDIT",
          category: "Audit & Monitoring",
          compliance_status: "Initial"
        },
        {
          status: "Initial",
          owner: "sumit@cloudmates.me",
          control_id: "403",
          comments: [],
          evidence: [],
          insights: "Internal audit effectiveness and continuous improvement.",
          lastupdate: "2025-07-30",
          description: "Internal Audits & Monitoring effectiveness assessment and improvement processes.",
          control_name: "Internal Audits & Monitoring",
          internal_review_status: "Initial",
          evidence_required: "Effectiveness assessments, improvement plans, process enhancements.",
          section_id: "PDPL-AUDIT",
          category: "Audit & Monitoring",
          compliance_status: "Initial"
        }
      ];

      // Add framework-specific prefix to control IDs
      const frameworkPrefixes = {
        "PDPL_SA_1": "PDPL",
        "PDPL_SA_2": "PDPL", 
        "PDPL_SA_3": "PDPL"
      };

      const prefix = frameworkPrefixes[fwId as keyof typeof frameworkPrefixes] || "CTRL";
      
      return baseControls.map(control => ({
        ...control,
        control_id: `${prefix}${control.control_id.padStart(3, '0')}`
      }));
    };

  return {
    cloudmates: "cloudmates",
    end_date: "2025-04-30",
    start_date: "2025-04-01",
    Assessments_id: "assessment-123",
    Organisation_id: API_CONFIG.ORG_ID,
    Status: "Active",
    framework_id: frameworkId || "PDPL_SA_1",
    controls: getControlsForFramework(frameworkId || "PDPL_SA_1")
  };
};