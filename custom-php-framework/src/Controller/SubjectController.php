<?php

namespace App\Controller;

use App\Model\Subject;
use App\Service\Router;
use App\Service\Templating;

class SubjectController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $subjects = Subject::findAll();
        $html = $templating->render('subject/index.html.php', [
            'subjects' => $subjects,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $subject = Subject::fromArray($requestPost);
            $subject->save();

            $path = $router->generatePath('subject-index');
            $router->redirect($path);
            return null;
        } else {
            $subject = new Subject();
        }

        $html = $templating->render('subject/create.html.php', [
            'subject' => $subject,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $subjectId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $subject = Subject::find($subjectId);
        if (!$subject) {
            throw new \Exception("Brak przedmiotu o id $subjectId");
        }

        if ($requestPost) {
            $subject->fill($requestPost);
            $subject->save();

            $path = $router->generatePath('subject-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('subject/edit.html.php', [
            'subject' => $subject,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $subjectId, Templating $templating, Router $router): ?string
    {
        $subject = Subject::find($subjectId);
        if (!$subject) {
            throw new \Exception("Brak przedmiotu o id $subjectId");
        }

        $html = $templating->render('subject/show.html.php', [
            'subject' => $subject,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $subjectId, Router $router): ?string
    {
        $subject = Subject::find($subjectId);
        if (!$subject) {
            throw new \Exception("Brak przedmiotu o id $subjectId");
        }

        $subject->delete();
        $path = $router->generatePath('subject-index');
        $router->redirect($path);
        return null;
    }
}
