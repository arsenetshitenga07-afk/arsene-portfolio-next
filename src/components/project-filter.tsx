"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/project-card";

type Filter = "all" | "interface" | "application" | "experiment";
export function ProjectFilter({ projects, labels, filterLabel, emptyLabel, openLabel }: { projects: Project[]; labels: Record<Filter, string>; filterLabel: string; emptyLabel: string; openLabel: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(() => filter === "all" ? projects : projects.filter((project) => {
    const category = project.category.toLowerCase();
    if (filter === "interface") return category.includes("interface");
    if (filter === "application") return category.includes("application");
    return category.includes("expérimentation") || category.includes("experiment");
  }), [filter, projects]);
  return <>
    <div className="filter-row" role="group" aria-label={filterLabel}>
      {(Object.keys(labels) as Filter[]).map((key) => <button key={key}
        className={"filter-chip" + (filter === key ? " is-selected" : "")} type="button"
        aria-pressed={filter === key} onClick={() => setFilter(key)}>{labels[key]}</button>)}
      <span className="filter-count">{visible.length.toString().padStart(2, "0")}</span>
    </div>
    {visible.length ? <div className="project-grid">{visible.map((project, index) =>
      <ProjectCard key={project.slug} project={project} index={index} label={openLabel} />)}</div>
      : <p className="empty-state">{emptyLabel}</p>}
  </>;
}