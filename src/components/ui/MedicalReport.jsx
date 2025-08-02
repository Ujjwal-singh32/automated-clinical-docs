
import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { toast } from 'react-toastify';

// --- CENTRED & SPACED WHITE/BLACK THEME ---
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    padding: 0,
    backgroundColor: '#fff',
    color: '#111',
    lineHeight: 1.5,
  },
  container: {
    margin: 24,
    border: '1.5px solid #111',
    borderRadius: 12,
    backgroundColor: '#fff',
    boxShadow: '0 8px 32px #1112',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#111',
    color: '#fff',
    paddingTop: 36,
    paddingBottom: 32,
    paddingLeft: 24,
    paddingRight: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottom: '2px solid #000',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#fff',
    marginBottom: 10,
  },
  detailsLine: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 3,
    fontWeight: 'normal',
    letterSpacing: 1,
  },
  headerSpacer: {
    height: 14,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
  section: {
    margin: 20,
    marginBottom: 0,
    paddingBottom: 0,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    boxShadow: '0 2px 12px #1110',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1.5px solid #111',
    paddingBottom: 3,
    textAlign: 'left',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#111',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 10,
    color: '#111',
    fontWeight: 600,
  },
  sectionDesc: {
    fontSize: 9,
    color: '#111',
    marginBottom: 8,
    // fontStyle: 'italic',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 7,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderLeft: '3px solid #111',
    borderRadius: 4,
    paddingLeft: 10,
    paddingTop: 4,
    paddingBottom: 4,
    boxShadow: '0 1px 4px #1111',
  },
  listIndex: {
    width: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
    fontSize: 11,
    backgroundColor: '#111',
    borderRadius: 4,
    textAlign: 'center',
    padding: 2,
    border: '1px solid #111',
  },
  listText: {
    fontSize: 10,
    color: '#111',
    flex: 1,
    fontWeight: 600,
  },
  remarks: {
    // fontStyle: '',
    fontWeight:'bold',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderLeft: '3px solid #111',
    borderRadius: 6,
    marginTop: 8,
    color: '#111',
    fontSize: 10,
    boxShadow: '0 1px 4px #1111',
  },
  sealBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    gap: 20,
  },
  seal: {
    fontSize: 10,
    color: '#111',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signature: {
    marginTop: 8,
    height: 60,
    objectFit: 'contain',
    alignSelf: 'center',
    borderRadius: 6,
    boxShadow: '0 2px 8px #1113',
  },
  sealImgBox: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 4,
    boxShadow: '0 1px 4px #1111',
  },
  sealImg: {
    height: 80,
    width: 100,
    objectFit: 'contain',
    borderRadius: 8,
    border: '1px solid #111',
    backgroundColor: '#fff',
  },
  footer: {
    borderTop: '2px solid #111',
    backgroundColor: '#fafafa',
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 22,
    boxShadow: '0 -2px 8px #1111',
  },
});


const MedicalReportPDF = ({ data, doctor }) => {
  if (!data) return null;
  // console.log("doctotr in child", doctor)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header - All Centered Details */}
          <View style={styles.header}>
            <Text style={styles.title}>Medicare Health</Text>
            <View style={styles.headerSpacer} />
            <Text style={styles.detailsLine}>{data.clinicAddress}</Text>
            <Text style={styles.detailsLine}>{data.contact}</Text>
            <Text style={styles.detailsLine}>
              Email: medicare.health.app@gmail.com
            </Text>
            <Text style={styles.detailsLine}>
              Website: www.medicarehealth.com
            </Text>
            <View style={styles.headerSpacer} />
            <Text style={styles.reportTitle}>MEDICAL CONSULTATION REPORT</Text>
          </View>

          {/* Patient Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Attending Physician:</Text>
              <Text style={styles.value}>{data.attendingPhysician}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{data.dateOfVisit}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.value}>Internal Medicine</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Medical License:</Text>
              <Text style={styles.value}>
                MD-{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Patient Name:</Text>
              <Text style={styles.value}>{data.patientName?.toUpperCase()}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.value}>{data.age || "—"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{data.gender || "—"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Weight:</Text>
              <Text style={styles.value}>{data.weight || "—"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Report ID:</Text>
              <Text style={styles.value}>
                PT-{Math.random().toString(36).substr(2, 6).toUpperCase()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.value}>{data.contactNumber || "—"}</Text>
            </View>
          </View>

          {/* Symptoms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Chief Complaints & Presenting Symptoms
            </Text>
            <Text style={styles.sectionDesc}>
              As reported by patient during consultation
            </Text>
            {data.symptoms?.map((symptom, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.listIndex}>{idx + 1}.</Text>
                <Text style={styles.listText}>{symptom}</Text>
              </View>
            ))}
          </View>

          {/* Observations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Clinical Examination & Observations
            </Text>
            <Text style={styles.sectionDesc}>
              Physical examination findings and vital signs
            </Text>
            {data.observations?.map((observation, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.listIndex}>{idx + 1}.</Text>
                <Text style={styles.listText}>{observation}</Text>
              </View>
            ))}
          </View>

          {/* Prescription */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Prescription & Treatment Protocol
            </Text>
            <Text style={styles.sectionDesc}>
              Prescribed medications and dosage instructions
            </Text>
            {data.prescription?.map((med, idx) => (
              <View style={styles.listItem} key={idx}>
                <Text style={styles.listIndex}>{idx + 1}.</Text>
                <Text style={styles.listText}>{med}</Text>
              </View>
            ))}
          </View>

          {/* Remarks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Physician Notes & Clinical Remarks
            </Text>
            <Text style={styles.sectionDesc}>
              Additional observations and recommendations
            </Text>
            <View style={styles.remarks}>
              <Text>"{data.remarks || "No remarks provided."}"</Text>
            </View>
          </View>

          {/* Footer / Seal / Signature */}
          <View style={styles.footer}>
            <View style={styles.sealBox}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.sectionTitle}>Official Medical Seal</Text>
                <View style={styles.sealImgBox}>
                  <Image
                    style={styles.sealImg}
                    src={
                      doctor?.stampUrl && doctor.stampUrl.trim() !== ""
                        ? doctor.stampUrl
                        : "/medical-seal.jpg"
                    }
                  />

                </View>
                <Text style={styles.seal}>
                  Valid only with official seal impression
                </Text>
                <Text style={styles.seal}>
                  SEAL-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.sectionTitle}>Physician Authorization</Text>
                <View style={styles.sealImgBox}>
                  <Image
                    style={styles.signature}
                    src={
                      doctor?.signatureUrl && doctor.signatureUrl.trim() !== ""
                        ? doctor.signatureUrl
                        : "/signature.jpg"
                    }
                  />

                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MedicalReportPDF;