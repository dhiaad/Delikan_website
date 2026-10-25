import { HONORAIRES, LEGAL, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import Todo from './Todo'

const Table = ({ title, note, rows }) => (
  <Fade className="honoraires__table">
    <h3 className="h3">{title}</h3>
    <p className="muted">{note}</p>
    <dl>
      {rows.map((r) => (
        <div key={r.acte}>
          <dt>{r.acte}</dt>
          <dd>
            <Todo value={r.prix}>tarif</Todo>
          </dd>
        </div>
      ))}
    </dl>
  </Fade>
)

// Information obligatoire (art. R.4127-240 du Code de la santé publique et recommandations ordinales) :
// honoraires pratiqués, modes de paiement acceptés et accès de tous aux soins sans discrimination.
export default function Honoraires() {
  return (
    <section className="section honoraires" id="honoraires">
      <div className="container">
        <Label index={sectionIndex('honoraires')}>Honoraires</Label>
        <Heading className="h2">
          Des tarifs <em>annoncés à l’avance.</em>
        </Heading>
        <Fade>
          <p className="honoraires__convention">
            <strong>{LEGAL.convention}</strong> Les soins courants (consultation, détartrage, soins, extractions) sont facturés au
            tarif de la convention nationale. Les prothèses, les implants et le blanchiment sont à honoraires libres : ils font
            toujours l’objet d’un devis écrit, remis avant le traitement.
          </p>
        </Fade>

        <div className="honoraires__grid">
          <Table
            title="Soins remboursés par l’Assurance Maladie"
            note="Tarifs conventionnels, sans dépassement."
            rows={HONORAIRES.conventionnes}
          />
          <Table
            title="Prothèses, implants et esthétique"
            note="Honoraires libres, à titre indicatif : le devis fait foi."
            rows={HONORAIRES.libres}
          />
        </div>

        <div className="honoraires__infos">
          <Fade>
            <h3 className="h3">Modes de paiement</h3>
            <p className="muted">
              <Todo value={HONORAIRES.paiements?.join(', ')}>modes de paiement acceptés</Todo>
              {HONORAIRES.paiements && '.'} Aucun mode de paiement particulier ne peut vous être imposé.
            </p>
          </Fade>
          <Fade delay={0.2}>
            <h3 className="h3">Accès aux soins pour tous</h3>
            <p className="muted">
              Le cabinet reçoit toute personne, sans discrimination. Les bénéficiaires de la Complémentaire santé
              solidaire (CSS) et de l’Aide médicale de l’État (AME) bénéficient de la dispense d’avance de frais et des
              tarifs prévus par la réglementation.
            </p>
          </Fade>
          <Fade delay={0.3}>
            <h3 className="h3">Pour en savoir plus</h3>
            <p className="muted">
              Les tarifs de référence et les remboursements sont consultables sur l’
              <a href="https://annuairesante.ameli.fr/" target="_blank" rel="noreferrer">
                annuaire santé d’ameli.fr
              </a>
              . Le cabinet répond à toute question sur le coût d’un traitement.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  )
}
