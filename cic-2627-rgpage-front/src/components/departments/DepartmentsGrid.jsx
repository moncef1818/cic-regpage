import Reveal from '../effects/Reveal';
import DepartmentCard from './DepartmentCard';
import { departments } from '../../assets/data/departments';

export default function DepartmentsGrid() {
  return (
    <section className="dept-section" id="departments">
      <Reveal className="section-head">
        <p className="section-eyebrow">Departments</p>
        <h2 className="section-title">Where will you contribute?</h2>
      </Reveal>

      <div className="dept-grid">
        {departments.map((dept, i) => (
          <DepartmentCard key={dept.value} dept={dept} index={i} />
        ))}
      </div>
    </section>
  );
}
