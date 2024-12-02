<?php

/** @var \App\Model\Subject $subject */
/** @var \App\Service\Router $router */

$title = "{$subject->getName()} ({$subject->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $subject->getName() ?></h1>
    <article>
        <?= $subject->getDescription(); ?>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('subject-index') ?>">Powrót do listy</a></li>
        <li><a href="<?= $router->generatePath('subject-edit', ['id' => $subject->getId()]) ?>">Edytuj</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
