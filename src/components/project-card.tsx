import { Link } from "@/i18n/routing";
import type { Project } from "@/types/project";
export function ProjectCard({project,index,label}:{project:Project;index:number;label:string}) {
  return <article className={"project-card project-card-"+(index%4)} data-reveal>
    <Link href={"/case-study/"+project.slug} className="project-link">
      <div className={"project-art art-"+project.visual} aria-hidden="true">
        <span className="art-orbit art-orbit-one"/><span className="art-orbit art-orbit-two"/>
        <span className="art-core">{project.visual==="telehealth" ? "+" : "✳"}</span>
        <span className="art-caption">{project.category}</span><span className="art-open">↗</span>
      </div>
      <div className="project-meta"><div><p className="project-type">{project.category} · {project.year}</p>
        <h3>{project.title}</h3><p className="project-summary">{project.summary}</p>
        <ul className="project-stack">{project.stack.slice(0,4).map((technology)=><li key={technology}>{technology}</li>)}</ul></div>
        <span className="project-arrow" aria-label={label}>↗</span></div>
    </Link>
  </article>;
}
